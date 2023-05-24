import { FastifyRequest, FastifyReply } from 'fastify';
import { SignUpUseCase } from '../../useCases/auth/SignUpUseCase';
import { CreateAccountDTO, CreateAccountDTOType } from '../../dtos/auth/SingUpDTO';
import { Login } from '../../../domain/models/Login';
import errorHandlingMiddleware from '../../../infrastructure/middlewares/errorHandlingMiddleware';

export class SignUpController {

  private signUpUseCase: SignUpUseCase;

  constructor(signUpUseCase: SignUpUseCase) {
    this.signUpUseCase = signUpUseCase;
  }

  async execute(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const accountDTO: CreateAccountDTOType = CreateAccountDTO.parse(req.body);

      const account: Login = {
        username: accountDTO.username,
        password: accountDTO.password,
        user: {
          name: accountDTO.name,
          passport: accountDTO.passport.toString(),
        }
      };

      //console.log(this.signUpUseCase)

      const login = await this.signUpUseCase.execute(account);

      res.send(login);
    } catch (error) {
      errorHandlingMiddleware(error, req, res);
    }
  }
}
