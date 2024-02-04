const awsServerlessExpress = require('aws-serverless-express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const binaryMimeTypes = [
  "application/javascript",
  "application/json",
  "application/octet-stream",
  "application/xml",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "text/comma-separated-values",
  "text/css",
  "text/html",
  "text/javascript",
  "text/plain",
  "text/text",
  "text/xml",
  "image/x-icon",
  "image/svg+xml",
  "application/x-font-ttf",
  "font/ttf",
  "font/otf",
  "font/woff",
  "font/woff2"
];

exports.handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  try {
    // Import the app from the ES module
    const server = await import('./dist/jiejiechenapp/server/server.mjs');
    const app = await server.app();

    app.use(awsServerlessExpressMiddleware.eventContext());

    // Create a server with the specified MIME types
    const serverAws = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

    if (!app) {
      console.error('Server is not initialized');
      return;
    } else {
      return awsServerlessExpress.proxy(serverAws, event, context, 'PROMISE').promise;
    }
  } catch (error) {
    console.error('Failed to import app:', error);
  }
};
