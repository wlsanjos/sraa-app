import { User } from '../../../domain/models/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import {
  DuplicateUserException,
  InternalServerErrorException,
  ValueNotFoundException
} from '../../../domain/exceptions/errors';
export class CreateUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userInput: User): Promise<void> {

    const role = await this.userRepository.findByRoleName('student');
    if (!role) {
      throw new ValueNotFoundException('Role not found');
    }

    const passportAlreadyExists = await this.userRepository.findByPassport(userInput.passport!);
    if (passportAlreadyExists) {
      throw new DuplicateUserException('Passport already exists');
    }

    const user: User = {
      name: userInput.name,
      surname: userInput.surname,
      passport: userInput.passport,
      role_id: role.id
    }

    try {
      await this.userRepository.createUser(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Internal server error")
    }
  }
}
