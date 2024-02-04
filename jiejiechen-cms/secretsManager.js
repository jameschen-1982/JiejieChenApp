'use strict'

const {SecretsManagerClient, GetSecretValueCommand} = require("@aws-sdk/client-secrets-manager");

class SecretsManager {

  /**
   * Uses AWS Secrets Manager to retrieve a secret
   */
  static async getSecret (secretName, region) {
    const config = {region: region}
    console.log("creating secret manager client");
    const client = new SecretsManagerClient(config);

    let response;
    try {
      console.log("calling secret manager client");
      response = await client.send(
        new GetSecretValueCommand({
          SecretId: secretName
        })
      );
    } catch (error) {
      // For a list of exceptions thrown, see
      // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
      throw error;
    }

    return response.SecretString;
  }
}
module.exports = SecretsManager;
