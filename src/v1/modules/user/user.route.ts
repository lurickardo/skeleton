import { userController } from "./user.controller";
import { userMiddleware } from "./user.middleware";
import { userSchema } from "./user.schema";

const findById = {
	method: "GET",
	url: "/v1/user/:id",
	schema: {
		tags: ["v1"],
		summary: "Find data of user by id",
		...userSchema.findById,
	},
	preHandler: userMiddleware.findById,
	handler: userController.findById,
	apisSorter: "alpha",
	operationsSorter: "method",
};

const listAll = {
	method: "GET",
	url: "/v1/user",
	schema: {
		tags: ["v1"],
		summary: "Find data of all users",
		...userSchema.listAll,
	},
	handler: userController.listAll,
};

const create = {
	method: "POST",
	url: "/v1/user",
	schema: {
		tags: ["v1"],
		summary: "Create user",
		...userSchema.create,
	},
	handler: userController.create,
};

const update = {
	method: "PUT",
	url: "/v1/user/:id",
	schema: {
		tags: ["v1"],
		summary: "Update user",
		...userSchema.update,
	},
	handler: userController.update,
};

const remove = {
	method: "DELETE",
	url: "/v1/user/:id",
	schema: {
		tags: ["v1"],
		summary: "Remove user",
		...userSchema.remove,
	},
	handler: userController.remove,
};

export const userRouteV1 = [findById, listAll, create, update, remove];
