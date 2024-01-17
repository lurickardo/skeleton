export const userSchema = {
	findById: {
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
	listAll: {
		params: {
			type: "object",
			properties: {},
			required: [],
		},
		headers: {
			type: "object",
			properties: {},
			additionalProperties: true,
		},
	},
	create: {
		body: {
			type: "object",
			properties: {
				name: {
					type: "string",
				},
				email: {
					type: "string",
				},
			},
			required: ["name", "email"],
		},
	},
	update: {
		params: {
			type: "object",
			properties: {
				id: {
					type: "string",
				},
			},
			required: ["id"],
		},
		body: {
			type: "object",
			properties: {
				name: {
					type: "string",
				},
				email: {
					type: "string",
				},
			},
			required: ["name", "email"],
		},
	},
	remove: {
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
			properties: {},
			additionalProperties: true,
		},
	},
};
