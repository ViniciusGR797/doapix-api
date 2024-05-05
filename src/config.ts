import dotenv from 'dotenv';

dotenv.config();

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
    splitConfigId: process.env.PIX_SPLIT_CONFIG_ID || '0123456789abcdef0123456789abcdef',
  },
  webHookUserId: process.env.HEBHOOK_USER_ID || '01234567-89ab-cdef-0123-456789abcdef',
  pusher: {
    appId: process.env.PUSHER_APP_ID || '1234567',
    key: process.env.PUSHER_KEY || '1234567890abcdefghij',
    secret: process.env.PUSHER_SECRET || '01234567890abcdefghi',
    cluster: process.env.PUSHER_CLUSTER || 'mt1',
    useTLS: Boolean(process.env.PUSHER_USE_TLS || true),
  },
};

export default config;
