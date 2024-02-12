const users = [
	{
		_id: "a20da655-f9fa-415b-946e-61bf1c8446fd",
		email: "skeleton@gmail.com",
		password: "$2a$12$aYho2yxMHnOUwX3bzNd7NehHh5wvsS5/qSUcZlhUrB9GQsKRgKqNu",
	},
];

export const userRepository = {
	findOne: ({ email }) => {
		const user = users.find((user) => user.email === email);
		return user;
	},
};
