import fastifyCors from '@fastify/cors';

export default (fastify) => {
  fastify.register(fastifyCors, {
    origin: '*',
  });
};