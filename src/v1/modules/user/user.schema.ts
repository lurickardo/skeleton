export const userSchema = {
	login: {
		body: {
			type: "object",
			properties: {
				email: {
					type: "string",
				},
				password: {
					type: "string",
				},
			},
			required: ["email", "password"],
		},
	},
	validate: {
		headers: {
			type: "object",
			properties: {
				authorization: { type: "string" },
			},
			required: ["authorization"],
			additionalProperties: true,
		},
	},
	logout: {
		headers: {
			type: "object",
			properties: {
				authorization: { type: "string" },
			},
			required: ["authorization"],
			additionalProperties: true,
		},
	},
};
