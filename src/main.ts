import fastify, { FastifyInstance } from "fastify";
import { routes } from "./app.module";
import { env } from "./config";
import { errorHandler } from "./config/error";
import { registerPlugins } from "./plugins";

const bootstrap = (): FastifyInstance => {
	const server: FastifyInstance = fastify({
		logger: true,
	});
	server.setErrorHandler((error, request, reply) =>
		errorHandler(error, request, reply),
	);
	registerPlugins(server, env);
	server.register(routes, { prefix: env.stripPrefix.path });
	return server;
};

if (require.main === module) {
	bootstrap().listen({ port: env.app.port || 3000 }, (err) => {
		if (err) console.error(err);
		console.log(`server listening on ${env.app.port || 3000}`);
	});
}

export { bootstrap };
