import { FastifyReply, FastifyRequest } from "fastify";
import { transformUserDto } from "./dto";
import { userService } from "./user.service";

export const userController = {
	findById: async ({ params: { id } }, reply: FastifyReply) => {
		return reply.code(200).send(await userService.findById(id));
	},

	create: async ({ body }: FastifyRequest, reply: FastifyReply) => {
		return reply
			.code(201)
			.send(await userService.create(transformUserDto(body)));
	},
};
