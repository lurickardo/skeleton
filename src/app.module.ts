import userModule from "./v1/modules/user/user.module";

const registerRoutes = (server, routes) => {
	routes.forEach((route) => {
		server.route(route);
	});
};

export default async (server) => {
	registerRoutes(server, [...userModule]);
};
