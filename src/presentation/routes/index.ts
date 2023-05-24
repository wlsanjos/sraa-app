import { FastifyInstance } from 'fastify';
import { userRoutes } from "./userRoutes"
import { authRoutes } from './authRoutes';

export const Routes = async (app : FastifyInstance) => {
  userRoutes(app);
  authRoutes(app);
}