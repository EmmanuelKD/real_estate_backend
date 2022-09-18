import * as functions from "firebase-functions";
import * as swaggerJsDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import * as express from "express";

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Real Estate and flight project',
      version: '1.0.0',
    },
    // servers: [{
    //   url: ""
    // }]
  },
  apis: ['./routes/*.ts'],

};
const spec = swaggerJsDoc(options);
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec))

/**
 * this is Just a test function
 */
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
