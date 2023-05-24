import { FastifyRequest, FastifyReply } from 'fastify';
import { SignInUseCase } from "../../useCases/auth/SignInUseCase";
import { LoginDTO, LoginDTOType } from '../../dtos/auth/SingInDTO';
import errorHandlingMiddleware from '../../../infrastructure/middlewares/errorHandlingMiddleware';

export class SignInController {
  private signInUseCase: SignInUseCase;

  constructor(signInUseCase: SignInUseCase) {
    this.signInUseCase = signInUseCase;
  }

  async execute(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const sign_in: LoginDTOType = LoginDTO.parse(req.body);

      const login = await this.signInUseCase.execute(sign_in);

      res.send(login);
    } catch (error) {
      errorHandlingMiddleware(error, req, res);
    }
  }
}