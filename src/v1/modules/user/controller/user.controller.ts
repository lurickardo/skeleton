import { httpException } from "../../../../config/error";
import userService from "../service/user.service";

export default {
	findUser: async ({ params: { id } }, reply) => {
		return reply.code(200).send(await userService.findUser(id));
	},
};
