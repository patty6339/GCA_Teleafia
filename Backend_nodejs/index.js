
const https = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const router = require('./routes/routes');
const path = require('path')
const fs = require('fs');

//require('./swagger')
const swaggerui = require('swagger-ui-express');
const swaggerjsdoc = require('swagger-jsdoc');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());


// Parse URL-encoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router)

// Serve static files from the 'Uploads' directory
app.use('/images', express.static(process.env.ABBIE_PATH));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const swaggerOptions = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Household registration API',
          version: '1.0.0',
          description: 'API documentation for my application', // Remove the extra comma here
      },
      servers: [
          {
              url: `http://localhost:${PORT}/api` 
          },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', 
          },
        },
      },
  },
  apis: ['./swagger/*.js']
};


const swaggerSpec = swaggerjsdoc(swaggerOptions);
app.use(
  '/api-docs',
  swaggerui.serve,
  swaggerui.setup(swaggerSpec)
)

 
// //SSL security configuration
// fs.readFile(path.join(__dirname, 'ssl_cert', 'key.pem'), (err, key) => {
//   if (err) throw err;
//   fs.readFile(path.join(__dirname, 'ssl_cert', 'cert.pem'), (err, cert) => {
//     if (err) throw err;

//     const sslServer = https.createServer({ key, cert }, app);
//     sslServer.listen(PORT, () => {
//       console.log(`Secure server running on port ${PORT}`);
//     });
//   });
// });

    app.listen(PORT, () => {
      console.log(`Secure server running on port ${PORT}`);
    });


  // app.listen(PORT, () => {
  //   console.log(`Secure server running on port ${PORT}`);
  // });






















