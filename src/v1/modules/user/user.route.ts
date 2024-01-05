import { userController } from "./user.controller";
import { userMiddleware } from "./user.middleware";
import { userSchema } from "./user.schema";

const findById = {
	method: "GET",
	url: "/v1/user/:id",
	schema: {
		tags: ["v1"],
		summary: "Find data of users",
		...userSchema.findById,
	},
	preHandler: userMiddleware.findById,
	handler: userController.findById,
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

export const userRouteV1 = [findById, create];
