import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Defina as configurações que você deseja usar
const config = {
  port: parseInt(process.env.PORT || '8080', 10),
  bdUri: process.env.DB_URI || 'postgresql://username:password@hostname/database?sslmode=require',
  saltRounds: parseInt(process.env.SALT_ROUNDS || '10', 10),
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY || 'suaChaveSecretaAqui',
    accessTokenExpires: process.env.JWT_ACCESS_TOKEN_EXPIRES || '10h',
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.office365.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: Boolean(process.env.EMAIL_SECURE  || false),
    auth: {
      user: process.env.EMAIL_AUTH_USER || '',
      pass: process.env.EMAIL_AUTH_PASS || '',
    },
  },
};

export default config;