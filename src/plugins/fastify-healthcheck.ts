import underPressure, { UnderPressureOptions } from "@fastify/under-pressure";
import { FastifyInstance } from "fastify";

export const healthcheck = (fastify: FastifyInstance, config) => {
	fastify.register(underPressure, {
		exposeStatusRoute: {
			url: `${config.stripPrefix.path}/healthcheck`,
		},
	} as UnderPressureOptions);
};
