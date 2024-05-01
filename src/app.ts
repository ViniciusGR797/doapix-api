import express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec, swaggerSpecJson, swaggerStyle } from './swagger/swaggerConfig';  

import userRoutes from './routes/userRoute';
import donationRoutes from './routes/donationRoute';
import transactionRoutes from './routes/transactionRoute';

import { connectDB } from './utils/database'; 

import cors from 'cors';

const app = express();

// Conecte ao DB uma vez, ao iniciar o aplicativo
connectDB();

app.use(express.json());
app.use(cors());

// Rotas da API
app.use('/users', userRoutes);
app.use('/donations', donationRoutes);
app.use('/transactions', transactionRoutes);

// Configurações do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerStyle));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecJson, swaggerStyle));

export default app;
