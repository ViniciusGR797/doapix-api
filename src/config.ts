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
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '465', 10),
    secure: Boolean(process.env.EMAIL_SECURE || true),
    auth: {
      user: process.env.EMAIL_AUTH_USER || 'support@doapix.com',
      pass: process.env.EMAIL_AUTH_PASS || 'password123',
    },
  },
  pix: {
    url: process.env.PIX_URL || 'https://api-pix.com.br',
    clientId: process.env.PIX_CLIENT_ID || 'Client_Id_FakeSample1234567890abcdef12345678',
    clientSecret: process.env.PIX_CLIENT_SECRET || 'Client_Secret_FakeSample1234567890abcdef12345678',
    certificateFile: process.env.PIX_CERTIFICATE_FILE || 'homologacao.p12.sample',
    certificateBase64: process.env.PIX_CERTIFICATE_BASE64 || '',
    pixKey: process.env.PIX_KEY || '1234abcd-5678-efgh-ijkl-9876mnopqrst',
    webHookUserId: process.env.HEBHOOK_USER_ID || 'f1cd0ab3-4f34-4a53-8b2c-594dd917d6ca',
  },
};

export default config;