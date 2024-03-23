import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec, swaggerSpecJson } from './swagger/swaggerConfig';  

import userRoutes from './routes/userRoute';
import donationRoutes from './routes/donationRoute';
import transactionRoutes from './routes/transactionRoute';

import { connectDB } from './utils/database'; 

const app = express();

// Conecte ao DB uma vez, ao iniciar o aplicativo
connectDB();

app.use(express.json());

// Rotas da API
app.use('/users', userRoutes);
app.use('/donations', donationRoutes);
app.use('/transactions', transactionRoutes);

// Configurações do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecJson));

export default app;
