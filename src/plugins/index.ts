import type { FastifyInstance } from "fastify";
import { env } from "../config";
import { cors } from "./fastify-cors";
import { healthcheck } from "./fastify-healthcheck";
import { schemaCompiler } from "./fastify-schema-compiler";
import { swagger } from "./fastify-swagger";

const plugins =
	env.app.environment?.toUpperCase() === "PRD"
		? [cors, healthcheck, schemaCompiler]
		: [swagger, cors, healthcheck, schemaCompiler];

export const registerPlugins = (server: FastifyInstance, config: any) => {
	for (const plugin of plugins) {
		plugin(server, config);
	}
};
