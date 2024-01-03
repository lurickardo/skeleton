import userService from "../service/user.service";

export default {
	findUser: async ({ params: { id } }, reply: Response) => {
		try {
			return userService.findUser(id);
		} catch (err) {}
	},
};
