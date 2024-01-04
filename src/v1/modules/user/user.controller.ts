import { FastifyReply, FastifyRequest } from "fastify";
import { userService } from "./user.service";

export const userController = {
	findById: async ({ params: { id } }, reply: FastifyReply) => {
		return reply.code(200).send(await userService.findById(id));
	},
};
