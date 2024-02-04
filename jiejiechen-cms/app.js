// src/app.js
const serverless = require("serverless-http");
const Strapi = require("@strapi/strapi");
const SecretsManager = require('./secretsManager.js');
const startStrapi = async (strapi) => {
  try {
    if (!strapi.isLoaded) {
      await strapi.load();
    }
    await strapi.postListen();
    strapi.server.mount();
    return strapi;
  } catch (error) {
    return strapi.stopWithError(error);
  }
};

let databaseUserName = null;
let databasePassword = null;

module.exports.strapiHandler = async (event, context) => {
  if (databaseUserName === null && databasePassword === null) {

    const secretName = process.env.DATABASE_SECRET_NAME;
    const region = process.env.REGION;
    let secretValue = await SecretsManager.getSecret(secretName, region);
    process.env.DATABASE_USERNAME = JSON.parse(secretValue).username;
    process.env.DATABASE_PASSWORD = JSON.parse(secretValue).password;
    databaseUserName = process.env.DATABASE_USERNAME;
    databasePassword = process.env.DATABASE_PASSWORD;
  } else {
    process.env.DATABASE_USERNAME = databaseUserName;
    process.env.DATABASE_PASSWORD = databasePassword;
  }

  let workingDir = process.cwd();
  if (process.env.LAMBDA_TASK_ROOT) {
    workingDir = process.env.LAMBDA_TASK_ROOT;
  }
  if (!global.strapi) {
    console.info("Cold starting Strapi");
    Strapi({ dir: workingDir });
  }
  if (!global.strapi.isLoaded) {
    await startStrapi(global.strapi);
  }
  const handler = serverless(global.strapi.server.app);
  return handler(event, context);
};
