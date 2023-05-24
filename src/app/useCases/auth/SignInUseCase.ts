import { Login } from '../../../domain/models/Login';
import { LoginRepository } from '../../../domain/repositories/LoginRepository';
import { UnauthorizedException } from '../../../domain/exceptions/errors';
import { compare } from 'bcrypt';
import { AuthPayload, AuthService, TokenResponse } from '../../services/AuthService';

export class SignInUseCase {
  private loginRepository: LoginRepository;

  constructor(loginRepository: LoginRepository) {
    this.loginRepository = loginRepository;
  }

  async execute(loginInput: Login): Promise<TokenResponse | null> {
    const login = await this.loginRepository.findByLoginAndUser(loginInput.username);

    if (!login) {
      throw new UnauthorizedException('The username or password is incorrect. Please retry...');
    }

    const verifyPassword = await compare(loginInput.password, login.password);
    if (!verifyPassword) {
      throw new UnauthorizedException('The username or password is incorrect. Please retry...');
    }

    console.log(login)

    let payload: AuthPayload = {
      id: login.user!.id!,
      name: login.user!.name!,
      passport: login.user!.passport!,
      role: {
        id: login.user!.role!.id!,
        name: login.user!.role!.name
      }
    };

    const authService = new AuthService(process.env.JWT_SECRET_KEY!);
    const token = authService.generateToken(payload);

    return {
      user: payload,
      token
    };
  }
}