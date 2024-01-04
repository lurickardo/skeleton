import { FastifyInstance, RouteOptions } from "fastify";
import { userRouteV1 } from "./v1/modules/user/user.route";

const registerRoutes = (server: FastifyInstance, routes: any[]): void => {
	routes.forEach((route) => {
		server.route(route);
	});
};

export const routes = async (server: FastifyInstance): Promise<void> => {
	registerRoutes(server, [...userRouteV1]);
};
