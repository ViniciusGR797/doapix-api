import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Defina as configurações que você deseja usar
const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  bd: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'myuser',
    password: process.env.DB_PWD || 'mypassword',
    database: process.env.DB_DATABASE || 'mydatabase',
    port: parseInt(process.env.DB_PORT || '5432', 10),
  },
  saltRounds: parseInt(process.env.SALT_ROUNDS || '10', 10),
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY || 'suaChaveSecretaAqui',
    accessTokenExpires: process.env.JWT_ACCESS_TOKEN_EXPIRES || '10h',
  },
};

export default config;