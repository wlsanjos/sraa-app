import { FastifyInstance } from 'fastify';
import { PrismaLoginRepository } from '../../infrastructure/repositories/PrismaLoginRepository';
import { SignUpUseCase } from '../../app/useCases/auth/SignUpUseCase';
import { SignUpController } from '../../app/controllers/auth/SignUpController';
import { SignInController } from '../../app/controllers/auth/SignInController';
import { SignInUseCase } from '../../app/useCases/auth/SignInUseCase';

export async function authRoutes(app: FastifyInstance) {

  const loginRepository = new PrismaLoginRepository();
  const signUpUseCase = new SignUpUseCase(loginRepository);
  const signUpController = new SignUpController(signUpUseCase);

  const signInUseCase = new SignInUseCase(loginRepository);
  const signInController = new SignInController(signInUseCase);

  //auth
  app.post('/api/sign-up', { schema: { protected: false } }, signUpController.execute.bind(signUpController));
  app.post('/api/sign-in', { schema: { protected: false } }, signInController.execute.bind(signInController));
};