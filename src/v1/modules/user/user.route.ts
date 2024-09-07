import type { RouteHandlerMethod, RouteOptions } from "fastify";
import { UserController } from "./user.controller";
import { UserMiddleware } from "./user.middleware";
import { UserSchema } from "./user.schema";

export class UserRouteV1 {
	private userController: UserController;
	private userMiddleware: UserMiddleware;
	private userSchema: UserSchema;

	constructor() {
		this.userController = new UserController();
		this.userMiddleware = new UserMiddleware();
		this.userSchema = new UserSchema();
	}

	private findById = (): RouteOptions => {
		return {
			method: "GET",
			url: "/v1/user/:id",
			schema: {
				tags: ["v1"],
				summary: "Find data of user by id",
				...this.userSchema.findById,
			},
			preHandler: this.userMiddleware.findById,
			handler: this.userController.findById as RouteHandlerMethod,
		};
	};

	private listAll = (): RouteOptions => {
		return {
			method: "GET",
			url: "/v1/user",
			schema: {
				tags: ["v1"],
				summary: "Find data of all users",
				...this.userSchema.listAll,
			},
			handler: this.userController.listAll as RouteHandlerMethod,
		};
	};

	private create = (): RouteOptions => {
		return {
			method: "POST",
			url: "/v1/user",
			schema: {
				tags: ["v1"],
				summary: "Create user",
				...this.userSchema.create,
			},
			handler: this.userController.create as RouteHandlerMethod,
		};
	};

	private update = (): RouteOptions => {
		return {
			method: "PUT",
			url: "/v1/user/:id",
			schema: {
				tags: ["v1"],
				summary: "Update user",
				...this.userSchema.update,
			},
			handler: this.userController.update as RouteHandlerMethod,
		};
	};

	private remove = (): RouteOptions => {
		return {
			method: "DELETE",
			url: "/v1/user/:id",
			schema: {
				tags: ["v1"],
				summary: "Remove user",
				...this.userSchema.remove,
			},
			handler: this.userController.remove as RouteHandlerMethod,
		};
	};

	public routes = (): RouteOptions[] => {
		return [
			this.findById(),
			this.listAll(),
			this.create(),
			this.update(),
			this.remove(),
		];
	};
}
