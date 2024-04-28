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
    secure: Boolean(process.env.EMAIL_SECURE || false),
    auth: {
      user: process.env.EMAIL_AUTH_USER || '',
      pass: process.env.EMAIL_AUTH_PASS || '',
    },
  },
  pix: {
    url: process.env.PIX_URL || 'https://api-pix.com.br',
    clientId: process.env.PIX_CLIENT_ID || 'Client_Id_FakeSample1234567890abcdef12345678',
    clientSecret: process.env.PIX_CLIENT_SECRET || 'Client_Secret_FakeSample1234567890abcdef12345678',
    certificate: process.env.PIX_CERTIFICATE || 'homologacao.p12.sample',
    pixKey: process.env.PIX_KEY || '1234abcd-5678-efgh-ijkl-9876mnopqrst',
  },
};

export default config;