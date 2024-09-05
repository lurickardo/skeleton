import { FastifyInstance } from "fastify";
import { UserRouteV1 } from "./v1/modules/user/user.route";

export class Route {
	public async registerRoutes(server: FastifyInstance): Promise<void> {
		[...new UserRouteV1().routes()].forEach((route) => {
			server.route(route);
		});
	}
}
