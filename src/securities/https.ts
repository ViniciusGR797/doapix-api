// import fs from 'fs';
// import https from 'https';
// import { SecureVersion } from 'tls';

// const httpsOptions: https.ServerOptions = {
//     cert: fs.readFileSync(''), // Certificado fullchain do dominio
//     key: fs.readFileSync('/'), // Chave privada do domínio
//     ca: fs.readFileSync('https://pix.gerencianet.com.br/webhooks/chain-pix-sandbox.crt'),   // Certificado público da Efí
//     minVersion: 'TLSv1.2' as SecureVersion,
//     requestCert: true,
//     rejectUnauthorized: true, // Caso precise que os demais endpoints não rejeitem requisições sem mTLS, você pode alterar para false
//   };

// export default httpsOptions;