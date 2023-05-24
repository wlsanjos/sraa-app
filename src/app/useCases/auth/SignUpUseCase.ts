import { Login } from '../../../domain/models/Login';
import { LoginRepository } from '../../../domain/repositories/LoginRepository';
import { genSalt, hash } from 'bcrypt';
import {
  DuplicateUserException,
  InternalServerErrorException,
  ValueNotFoundException
} from '../../../domain/exceptions/errors';

export class SignUpUseCase {
  private loginRepository: LoginRepository;

  constructor(loginRepository: LoginRepository) {
    this.loginRepository = loginRepository;
  }

  async execute(loginInput: Login): Promise<void> {
    const role = await this.loginRepository.findByRoleName('student');
    if (!role) {
      throw new ValueNotFoundException('Role not found');
    }

    const usernameAlreadyExists = await this.loginRepository.findByUsername(loginInput.username);
    if (usernameAlreadyExists) {
      throw new DuplicateUserException('Username already exists');
    }

    const passportAlreadyExists = await this.loginRepository.findByUserPassport(loginInput.user!.passport!);
    if (passportAlreadyExists) {
      throw new DuplicateUserException('Passport already exists');
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(loginInput.password, salt);

    loginInput.password = passwordHash;
    loginInput.user!.role_id = role?.id;

    try {
      await this.loginRepository.createAccount(loginInput);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Internal server error")
    }
  }
}
