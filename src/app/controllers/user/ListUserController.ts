
import { FastifyRequest, FastifyReply } from 'fastify';
import { ListUsersQueryDTO, ListUsersQueryType } from '../../dtos/user/ListUsersQueryDTO';
import { ListUserUseCase } from '../../useCases/user/ListUserUseCase';

export class ListUserController {
  private listUserUseCase: ListUserUseCase;

  constructor(listUserUseCase: ListUserUseCase) {
    this.listUserUseCase = listUserUseCase;
  }

  async execute(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const queryDTO: ListUsersQueryType = ListUsersQueryDTO.parse(req.query);

      // Realize a busca com base nos critérios da query
      const users = await this.listUserUseCase.getAllUsers();

      res.send(users);
    } catch (error) {
      console.log(error);
      res.status(400).send('Invalid query parameters');
    }
  }
}
