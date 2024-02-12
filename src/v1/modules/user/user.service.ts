import * as bcrypt from "bcrypt";
import * as HttpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import { getToken } from "../../../../src/utils";
import { env } from "../../../config";
import { httpException } from "../../../config/error";
import { LoginUserDto } from "./dto";
import { tokenRepository } from "./repository/mongodb/token.repository";
import { userRepository } from "./repository/mongodb/user.repository";

export const userService = {
	login: async (loginUserDto: LoginUserDto) => {
		try {
			const user = userRepository.findOne({ email: loginUserDto.email });

			if (!user) {
				throw httpException("User not found.", HttpStatus.NOT_FOUND);
			}

			const checkPassword = await bcrypt.compare(
				loginUserDto.password,
				user.password,
			);

			if (!checkPassword) {
				throw httpException("User not found.", HttpStatus.NOT_FOUND);
			}

			const token = jwt.sign(
				{
					email: loginUserDto.email,
				},
				env.jwt.secret,
			);

			return { message: "Authenticated.", token };
		} catch (error) {
			throw error;
		}
	},

	validate: async (authorization: string) => {
		const token = getToken(authorization);

		jwt.verify(token, env.jwt.secret);

		if (tokenRepository.findOneTokenLoggedOut(token))
			throw httpException("Access denied.", 401);
		return { message: "Authenticated." };
	},

	logout: async (authorization: string) => {
		try {
			const token = getToken(authorization);
			tokenRepository.createTokenLoggedOut(token);

			return { message: "User has been logged out." };
		} catch (error) {
			throw error;
		}
	},
};
