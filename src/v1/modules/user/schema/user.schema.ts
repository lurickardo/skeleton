export default {
	findUser: {
		params: {
			type: "object",
			properties: {
				id: {
					type: "string",
				},
			},
			required: ["id"],
		},
		headers: {
			type: "object",
			properties: {
				Authorization: { type: "string" },
			},
			additionalProperties: true,
		},
	},
};
