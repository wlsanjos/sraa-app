import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserUseCase } from '../../useCases/user/CreateUserUseCase';
import { CreateUserDTO, CreateUserDTOType, } from '../../dtos/user/CreateUserDTO';
import errorHandlingMiddleware from '../../../infrastructure/middlewares/errorHandlingMiddleware';

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const userDTO: CreateUserDTOType = CreateUserDTO.parse(req.body);

      const user = await this.createUserUseCase.execute({
        name: userDTO.name,
        surname: userDTO.surname,
        passport: userDTO.passport.toString().trim()
      });

      res.send(user);
    } catch (error) {
      errorHandlingMiddleware(error, req, res);
    }
  }
}
