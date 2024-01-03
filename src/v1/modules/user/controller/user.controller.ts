import userService from "../service/user.service";

export default {
	findUser: async ({ params: { id } }, reply) => {
		try {
			return userService.findUser(id);
		} catch (err) {}
	},
};
