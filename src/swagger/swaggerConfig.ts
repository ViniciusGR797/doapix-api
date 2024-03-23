import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import fs from 'fs';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RESTful - DoaPix',
      version: '1.0.0',
      description: "",
      license: {
        name: 'MIT License',
        url: 'https://github.com/ViniciusGR797/doapix-api/blob/master/LICENSE',
      },
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Para autenticar, coloque o token JWT no formato **Bearer _token_**.",
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerSpecJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8'));

export { swaggerSpec, swaggerSpecJson };
