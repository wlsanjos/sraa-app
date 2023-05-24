import { FastifyRequest, FastifyReply, RouteShorthandOptions, FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifySchema {
    protected?: boolean;
  }

  interface FastifyRequest {
    //payload: { id: string } // payload type is used for signing and verifying
    user: {
      id: string;
      name?: string;
      passport?: string;
      iat: number;
    }
  }
}

export default FastifyInstance;
