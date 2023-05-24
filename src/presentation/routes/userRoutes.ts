import { FastifyInstance } from 'fastify';

import { PrismaUserRepository } from '../../infrastructure/repositories/PrismaUserRepository';
import { CreateUserUseCase } from '../../app/useCases/user/CreateUserUseCase';
import { CreateUserController } from '../../app/controllers/user/CreateUserController';
import { ListUserController } from '../../app/controllers/user/ListUserController';
import { ListUserUseCase } from '../../app/useCases/user/ListUserUseCase';
import { DeleteUserUseCase } from '../../app/useCases/user/DeleteUserUseCase';
import { DeleteUserController } from '../../app/controllers/user/DeleteUserController';
import { UpdateUserUseCase } from '../../app/useCases/user/UpdateUserUseCase';
import { UpdateUserController } from '../../app/controllers/user/UpdateUserController';

export async function userRoutes(app: FastifyInstance) {

  const userRepository = new PrismaUserRepository();

  //create
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  //update
  const updateUserUseCase = new UpdateUserUseCase(userRepository);
  const updateUserController = new UpdateUserController(updateUserUseCase);

  //delete
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  //list
  const listUserUseCase = new ListUserUseCase(userRepository);
  const listUserController = new ListUserController(listUserUseCase);

  app.post('/api/users', { schema: { protected: true } }, createUserController.execute.bind(createUserController));
  app.put('/api/users/:id', { schema: { protected: true } }, updateUserController.execute.bind(updateUserController));
  app.get('/api/users', { schema: { protected: true } }, listUserController.execute.bind(listUserController));
  app.delete('/api/users/:id', { schema: { protected: true } }, deleteUserController.execute.bind(deleteUserController));
};