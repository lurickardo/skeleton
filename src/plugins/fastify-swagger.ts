import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import { description, name, version } from "../../package.json";

export const swagger = async (fastify: FastifyInstance, config: any) => {
	await fastify.register(fastifySwagger, {
		swagger: {
			info: {
				title: name,
				description,
				version,
			},
			schemes: ["http"],
			consumes: ["application/json"],
			produces: ["application/json"],
			externalDocs: {
				url: "https://swagger.io",
				description: "Find more info here",
			},
		},
	});

	await fastify.register(fastifySwaggerUi, {
		routePrefix: `${config.stripPrefix.path}/docs`,
		initOAuth: {},
		uiConfig: {
			docExpansion: "full",
			deepLinking: false,
		},
		uiHooks: {
			onRequest(request, reply, next) {
				next();
			},
			preHandler(request, reply, next) {
				next();
			},
		},
		staticCSP: true,
		transformStaticCSP: (header) => header,
	});
};
