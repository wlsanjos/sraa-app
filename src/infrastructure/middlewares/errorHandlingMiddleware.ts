import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import {
  DuplicateUserException,
  ValueNotFoundException,
  InternalServerErrorException,
  InvalidTokenException,
  UnauthorizedException,
} from '../../domain/exceptions/errors';

const errorHandlingMiddleware = (error: any, req: FastifyRequest, res: FastifyReply) => {
  console.log(error);

  if (error instanceof ZodError) {
    console.log(error.errors);
    const { errors } = error;
    res.status(500).send(errors[errors.length - 1]);
  } else if (
    error instanceof DuplicateUserException ||
    error instanceof ValueNotFoundException ||
    error instanceof UnauthorizedException
  ) {
    console.log(error);
    res.status(400).send({ code: 'invalid', message: error.message });
  } else if (error instanceof InternalServerErrorException) {
    console.log(error);
    res.status(500).send({ code: 'internal', message: error.message });
  } else if (error instanceof InvalidTokenException) {
    console.log(error);
    res.status(401).send({ code: 'unauthorized', message: error.message });
  } else {
    console.log(error);
    res.status(500).send({ code: 'internal', message: 'Internal Server Error' });
  }
};

export default errorHandlingMiddleware;
