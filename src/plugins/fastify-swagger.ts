import fastifySwagger from "@fastify/swagger";
import swaggerScalar from "@scalar/fastify-api-reference";
import type { FastifyInstance } from "fastify";
import * as application from "../../package.json";

export const swagger = async (fastify, config: any) => {
	await fastify.register(fastifySwagger, {
		swagger: {
			info: {
				title: application.name,
				version: application.version,
				description: application.description,
				contact: {
					name: application.author,
					email: application.email,
				},
				license: {
					name: application.license,
				},
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

	await fastify.register(swaggerScalar, {
		routePrefix: `${config.stripPrefix.path}/docs`,
		configuration: {
			theme: "bluePlanet",
			layout: "classic",
			darkMode: true,
		},
	});
};
