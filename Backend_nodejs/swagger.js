
// // const swaggerAutogen = require('swagger-autogen')
// // const outputFile = './swagger_output.json';
// // const endpointsFiles = ['./routes/routes.js'];

// // const doc = {
// //   info: {
// //     title: 'Teleafia Application',
// //     description: 'API Documentation',
// //   },
// //   host: 'localhost:5500',
// //   schemes: ['http'],
  
// //   securityDefinitions: {
// //     Bearer: {
// //       type: 'apiKey',
// //       name: 'Authorization',
// //       in: 'header'
// //     }
// //   },
  
  
// // };



const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen')();

const app = express();
const router = require('./routes/routes');

// Define the output file for Swagger documentation
const outputFile = './swagger_output.json';

// Define the input files containing endpoint definitions
const endpointsFiles = ['./routes/routes.js'];

// Swagger configuration
const doc = {
  info: {
    title: 'Teleafia Application',
    description: 'API Documentation for Teleafia Application',
    version: '1.0.0',
  },
  host: 'localhost:5500', // Update with your host
  basePath: '/api', // Base path for all endpoints
  schemes: ['http'], // HTTP protocol
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
};


app.use('/api', router)

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully.');
}).catch(error => {
  console.error('Error generating Swagger documentation:', error);
});

