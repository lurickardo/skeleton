import underPressure from '@fastify/under-pressure';

export default (fastify, config) => {
  fastify.register(underPressure, {
    exposeStatusRoute: {
      url: `${config.stripPrefix.path}/healthcheck`,
    },
  });
};