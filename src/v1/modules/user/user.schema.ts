import type { FastifySchema } from "fastify";

export class UserSchema {
	public findById: FastifySchema = {
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
	};

	public listAll: FastifySchema = {
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
	};

	public create: FastifySchema = {
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
	};

	public update: FastifySchema = {
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
	};

	public remove: FastifySchema = {
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
	};
}
