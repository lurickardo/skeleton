import fastify from 'fastify'
import config from './config'
import { registerPlugins } from './plugins'
import routes from './app.module'
import clusterize from './clusterize'

const server = fastify({
  logger: true
})

async function bootstrap() {
  try {
    //server.setErrorHandler((error, request, reply) =>   (error, request, reply));
    registerPlugins(server, config);
    server.register(routes, { prefix: config.stripPrefix.path })
    server.listen({ port: config.app.port || 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
};

clusterize(bootstrap);