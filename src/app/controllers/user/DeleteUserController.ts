import { FastifyRequest, FastifyReply } from 'fastify';
import { DeleteUserUseCase } from '../../useCases/user/DeleteUserUseCase';
import errorHandlingMiddleware from '../../../infrastructure/middlewares/errorHandlingMiddleware';
import { IdParamsDTO, IdParamsDTOType } from '../../dtos/params/IdParamsDTO';

export class DeleteUserController {

  private deleteUserUseCase: DeleteUserUseCase;

  constructor(deleteUserUseCase: DeleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase;
  }

  async execute(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const deleteUserDTO: IdParamsDTOType = IdParamsDTO.parse(req.params);

      await this.deleteUserUseCase.execute(deleteUserDTO.id);

      res.send({ message: 'User deleted successfully' });
    } catch (error) {
      console.log(error);
      errorHandlingMiddleware(error, req, res);
    }
  }
}
