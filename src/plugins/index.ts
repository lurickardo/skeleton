import { FastifyInstance } from "fastify";
import { env } from "../config/env";
import { cors } from "./fastify-cors";
import { healthcheck } from "./fastify-healthcheck";
import { schemaCompiler } from "./fastify-schema-compiler";
import { swagger } from "./fastify-swagger";

const plugins =
	env.app.environment?.toUpperCase() === "PRD"
		? [cors, healthcheck, schemaCompiler]
		: [swagger, cors, healthcheck, schemaCompiler];

export const registerPlugins = (server: FastifyInstance, config: any) => {
	plugins.forEach((plugin) => plugin(server, config));
};
