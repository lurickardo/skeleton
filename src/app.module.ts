import type { FastifyInstance } from "fastify";
import { UserRouteV1 } from "./v1/modules/user/user.route";

export class Route {
	public registerRoutes = async (server: FastifyInstance): Promise<void> => {
		for (const route of [...new UserRouteV1().routes()]) {
			server.route(route);
		}
	};
}
