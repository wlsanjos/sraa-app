import fastify from 'fastify';
import cors from '@fastify/cors';
import "@fastify/jwt";

import { Routes } from './presentation/routes';
import jwtAuthMiddleware from './infrastructure/middlewares/jwtAuthMiddleware';
import { AuthService } from './app/services/AuthService';
import errorHandlingMiddleware from './infrastructure/middlewares/errorHandlingMiddleware';

const app = fastify();

app.register(cors);
// Registre o middleware JWT
const authService = new AuthService(process.env.JWT_SECRET_KEY!);
jwtAuthMiddleware(app, authService);
app.setErrorHandler(errorHandlingMiddleware);

app.register(Routes);

const PORT = 3333;

app.listen({
  port: PORT,
  host: '0.0.0.0'
}).then(() => {
  console.log(`HTTP Server running on http://localhost:${PORT}`);
});

