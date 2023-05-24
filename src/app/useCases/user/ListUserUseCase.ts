import { InternalServerErrorException } from '../../../domain/exceptions/errors';
import { User } from '../../../domain/models/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';

export class ListUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<Array<User> | null> {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
