import { FastifyReply, FastifyRequest } from "fastify";
import { transformLoginUserDto } from "./dto";
import { userService } from "./user.service";

// TODO:
// - Add tests to routes
export const userController = {
	login: async ({ body }: FastifyRequest, reply: FastifyReply) => {
		return reply
			.code(200)
			.send(await userService.login(transformLoginUserDto(body)));
	},

	validate: async (
		{ headers: { authorization } }: FastifyRequest,
		reply: FastifyReply,
	) => {
		return reply.code(200).send(await userService.validate(authorization));
	},

	logout: async (
		{ headers: { authorization } }: FastifyRequest,
		reply: FastifyReply,
	) => {
		return reply.code(200).send(await userService.logout(authorization));
	},
};
