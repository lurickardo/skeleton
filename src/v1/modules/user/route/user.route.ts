import usersController from "../controller/user.controller";
import userMiddleware from "../middleware/user.middleware";
import userSchema from "../schema/user.schema";

const tags = ["v1"];

export default {
	findUser: {
		method: "GET",
		url: "/v1/user/:id",
		schema: {
			tags,
			summary: "Find data of users",
			...userSchema.findUser,
		},
		preHandler: userMiddleware.findUser,
		handler: usersController.findUser,
	},
};
