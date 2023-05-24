import { DuplicateUserException, InternalServerErrorException, ValueNotFoundException } from '../../../domain/exceptions/errors';
import { User } from '../../../domain/models/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';

export class UpdateUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: string, userInput: User): Promise<void> {

    const userAlreadyExists = await this.userRepository.getUserId(id);
    if (!userAlreadyExists) {
      throw new ValueNotFoundException('User not found');
    }

    const usernameAlreadyExists = await this.userRepository.getUserBySurname(userInput.surname!.toString().trim());
    if (usernameAlreadyExists) {
      throw new DuplicateUserException('Username already exists');
    }

    try {
      await this.userRepository.updateUser({
        id: id,
        ...userInput,
      });
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
