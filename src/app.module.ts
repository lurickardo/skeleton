import { FastifyInstance, RouteOptions } from "fastify";
import userModule from "./v1/modules/user/user.module";

const registerRoutes = (server: FastifyInstance, routes: any[]): void => {
	routes.forEach((route) => {
		server.route(route);
	});
};

export default async (server: FastifyInstance): Promise<void> => {
	registerRoutes(server, [...userModule]);
};
