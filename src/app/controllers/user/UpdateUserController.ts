import { FastifyRequest, FastifyReply } from 'fastify';
import { UpdateUserUseCase } from '../../useCases/user/UpdateUserUseCase';
import { IdParamsDTO, IdParamsDTOType } from '../../dtos/params/IdParamsDTO';
import { UpdateUserDTO, UpdateUserDTOType } from '../../dtos/user/UpdateUserDTO';
import errorHandlingMiddleware from '../../../infrastructure/middlewares/errorHandlingMiddleware';

export class UpdateUserController {
  private updateUserUseCase: UpdateUserUseCase;

  constructor(updateUserUseCase: UpdateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }

  async execute(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const idParamsUserDTO: IdParamsDTOType = IdParamsDTO.parse(req.params);
      const updateUserDTO: UpdateUserDTOType = UpdateUserDTO.parse(req.body);

      await this.updateUserUseCase.execute(idParamsUserDTO.id, updateUserDTO);

      res.send({ message: 'User deleted successfully' });
    } catch (error) {
      console.log(error);
      errorHandlingMiddleware(error, req, res);
    }
  }
}