import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import fs from 'fs';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RESTful - DoaPix',
      version: '1.0.0',
      description: "Este projeto consiste na construção de uma **API RESTful usando Node.js e TypeScript**, com integração ao banco de dados **PostgreSQL**, " +
      "para criar um sistema que permita aos usuários gerenciar **doações solidárias online**. As doações serão organizadas em categorias " +
      "e também terão um histórico para acompanhamento de doações realizadas. Através de uma interface amigável, os usuários poderão " +
      "**criar, visualizar, editar e excluir doações**, além de acompanhar **doações previamente realizadas**.\n\n" +

      "A API fornecerá aos usuários todas as funcionalidades necessárias para realizar operações básicas em suas doações, " +
      "como criar, visualizar, editar e excluir. Além disso, ela será projetada para garantir a segurança e a privacidade dos " +
      "dados do usuário, implementando práticas adequadas de autenticação e autorização.\n\n" +

      "O uso do **Node.js e TypeScript** permitirá uma **fácil implementação dos endpoints da API**, bem como a manutenção do código " +
      "com tipagem estática, tornando o processo de desenvolvimento mais seguro e organizado. Utilizaremos o **PostgreSQL** como nosso " +
      "banco de dados para **armazenar as doações e as informações relacionadas a categorias e histórico de transações**.\n\n" +

      "Para a **documentação da API**, faremos uso do **Swagger UI** através do pacote **'swagger-ui-express'** em conjunto com o **'swagger-jsdoc'**, " +
      "o que permitirá gerar automaticamente a documentação da API a partir das anotações do código-fonte. Isso tornará mais fácil " +
      "para os desenvolvedores e usuários entenderem e interagirem com os endpoints da API.\n\n" +

      "Para gerenciar as dependências do projeto, utilizaremos o **Yarn** como gerenciador de pacotes, garantindo uma instalação mais " +
      "rápida e confiável das bibliotecas necessárias para o desenvolvimento.\n\n" +

      "Em suma, o objetivo deste software é oferecer aos usuários uma **maneira prática e segura de gerenciar suas doações online**, " +
      "proporcionando organização através de categorias e a capacidade de acompanhar doações realizadas. Com uma API RESTful " +
      "completa e bem documentada, esperamos fornecer uma solução confiável e eficiente para atender às necessidades de " +
      "gerenciamento de doações de nossos usuários. As doações são anônimas e o principal meio de pagamento é o Pix.",
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
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerJsonPath = path.join(__dirname, 'swagger.json');
const swaggerSpecJson = fs.existsSync(swaggerJsonPath) ? JSON.parse(fs.readFileSync(swaggerJsonPath, 'utf8')) : null;

export { swaggerSpec, swaggerSpecJson };
