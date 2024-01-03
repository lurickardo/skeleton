import { FastifyReply, FastifyRequest } from "fastify";
import userService from "../service/user.service";

export default {
	findUser: async ({ params: { id } }, reply: FastifyReply) => {
		throw Error('safsa');
		return reply.code(200).send(await userService.findUser(id));
	},
};
