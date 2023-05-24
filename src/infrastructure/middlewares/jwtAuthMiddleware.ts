import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { AuthPayload, AuthService } from '../../app/services/AuthService';
import { InvalidTokenException } from '../../domain/exceptions/errors';

const jwtAuthMiddleware = (app: FastifyInstance, authService: AuthService) => {
  app.decorateRequest('user', null);

  app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    const isRouteProtected = request.routeSchema.protected;

    if (!isRouteProtected) {
      return; // Rota não requer autenticação, permitir acesso
    }

    try {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        throw new InvalidTokenException('Token not found');
      }

      const decodedToken = authService.verifyToken(token) as AuthPayload;
      request.user = decodedToken;

    } catch (error) {
      reply.status(401).send({ message: 'Invalid token' });
    }
  });
};

export default jwtAuthMiddleware;
