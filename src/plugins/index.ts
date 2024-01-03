import { FastifyInstance } from "fastify";
import config from "../config";
import cors from "./fastify-cors";
import healthcheck from "./fastify-healthcheck";
import schemaCompiler from "./fastify-schema-compiler";
import swagger from "./fastify-swagger";

const plugins =
	config.app.environment?.toUpperCase() === "PRD"
		? [cors, healthcheck, schemaCompiler]
		: [swagger, cors, healthcheck, schemaCompiler];

export const registerPlugins = (server: FastifyInstance, config: any) => {
	plugins.forEach((plugin) => plugin(server, config));
};
