import fastify, { FastifyInstance } from "fastify";
import { routes } from "./app.module";
import { clusterize } from "./clusterize";
import { env } from "./config";
import { errorHandler } from "./config/error";
import { registerPlugins } from "./plugins";

const server: FastifyInstance = fastify({
	logger: true,
});

async function bootstrap(): Promise<void> {
	try {
		server.setErrorHandler((error, request, reply) =>
			errorHandler(error, request, reply),
		);
		registerPlugins(server, env);
		server.register(routes, { prefix: env.stripPrefix.path });
		await server.listen({ port: env.app.port || 3000 });
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
}

clusterize(bootstrap);
