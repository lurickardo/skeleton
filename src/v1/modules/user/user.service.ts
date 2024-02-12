import * as jwt from "jsonwebtoken";
import { getToken } from "../../../../src/utils";
import { env } from "../../../config";
import { httpException } from "../../../config/error";
import { LoginUserDto } from "./dto";

// TODO:
// - Add tests to funcions
export const userService = {
	login: async (loginUserDto: LoginUserDto) => {
		try {
			return {};
		} catch (error) {
			throw error;
		}
	},

	validate: async (authorization: string) => {
		try {
			const token = getToken(authorization);
			//TODO:
			// - validate if token not has expired
			// - validate if token not has in logout table

			jwt.verify(token, env.jwt.secret);
			return { message: "Authenticated." };
		} catch (err) {
			throw httpException("Access denied.", 401);
		}
	},

	logout: async (authorization: string) => {
		try {
			const token = getToken(authorization);
			//TODO:
			// - Register token to table logout of db
			return { message: "User has been logged out." };
		} catch (error) {
			throw error;
		}
	},
};
