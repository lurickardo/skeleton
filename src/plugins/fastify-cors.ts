import fastifyCors from "@fastify/cors";
import type { FastifyInstance } from "fastify";

export const cors = (fastify: FastifyInstance) => {
	fastify.register(fastifyCors, {
		origin: "*",
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	});
};
