export default {
	findUser: async (id: string) => {
		try {
			return { idUser: id };
		} catch (err) {}
	},
};
