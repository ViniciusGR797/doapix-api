import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec, swaggerSpecJson, swaggerStyle } from './swagger/swaggerConfig';
import { connectDB } from './utils/database';
import userRoutes from './routes/userRoute';
import donationRoutes from './routes/donationRoute';
import transactionRoutes from './routes/transactionRoute';
import webHookRoutes from './routes/webHookRoute';

const app = express();

// Conecte ao DB uma vez, ao iniciar o aplicativo
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
}));

// Rotas da API
app.use('/users', userRoutes);
app.use('/donations', donationRoutes);
app.use('/transactions', transactionRoutes);

// Rota de WebHook
app.use('/webhook', webHookRoutes);

// Configurações do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerStyle));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecJson, swaggerStyle));

export default app;