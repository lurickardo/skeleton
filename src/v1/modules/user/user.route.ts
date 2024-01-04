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

export const userRouteV1 = [findById];
