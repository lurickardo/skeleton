import fastify, { type FastifyInstance } from "fastify";
import { Route } from "./app.module";
import { clusterize } from "./clusterize";
import { env } from "./config";
import { errorHandler } from "./config/error";
import { registerPlugins } from "./plugins";

const server: FastifyInstance = fastify({
	logger: true,
});

async function bootstrap(): Promise<void> {
	try {
		process.stdout.write("\x1Bc\n\x1b[32mStarting server...\x1b[0m\n");
		server.setErrorHandler((error, request, reply) =>
			errorHandler(error, request, reply),
		);

		registerPlugins(server, env);

		server.register(new Route().registerRoutes, {
			prefix: env.stripPrefix.path,
		});
		await server.listen({ port: env.app.port || 3000, host: "::" });
	} catch (error) {
		server.log.error(error);
		process.exit(1);
	}
}

clusterize(bootstrap);
