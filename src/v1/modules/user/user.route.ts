import { userController } from "./user.controller";
import { userSchema } from "./user.schema";

const login = {
	method: "POST",
	url: "/v1/user/login",
	schema: {
		tags: ["v1"],
		summary: "Login user.",
		...userSchema.login,
	},
	handler: userController.login,
};

const validate = {
	method: "GET",
	url: "/v1/user/validate",
	schema: {
		tags: ["v1"],
		summary: "Validate user token.",
		...userSchema.validate,
	},
	handler: userController.validate,
};

const logout = {
	method: "GET",
	url: "/v1/user/logout",
	schema: {
		tags: ["v1"],
		summary: "Logout user.",
		...userSchema.logout,
	},
	handler: userController.logout,
};

export const userRouteV1 = [login, validate, logout];
