import { InternalServerErrorException, ValueNotFoundException } from '../../../domain/exceptions/errors';
import { UserRepository } from '../../../domain/repositories/UserRepository';

export class DeleteUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: string): Promise<void> {

    const userAlreadyExists = await this.userRepository.getUserId(id);
    if (!userAlreadyExists) {
      throw new ValueNotFoundException('User not found');
    }

    try {
      await this.userRepository.deleteUser(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
