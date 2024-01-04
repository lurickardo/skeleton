export const userService = {
	findById: async (id: string) => {
		try {
			return { idUser: id };
		} catch (err) {}
	},
};
