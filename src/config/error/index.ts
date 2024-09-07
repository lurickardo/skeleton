import type { FastifyReply, FastifyRequest } from "fastify";
import * as HttpStatus from "http-status";

const isFastifyError = (error: any): boolean => {
	return error.code < 600 || (error.statusCode && error.statusCode === 400);
};

const isZodError = (error: any): boolean => {
	return !!error.issues;
};

const isFlowError = (error: any): boolean => {
	return error.message && error.statusCode;
};

export const errorHandler = (
	genericError: any,
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const error = { ...genericError };

	if (isFastifyError(error)) {
		const validationContext = error.validationContext
			? `${error.validationContext} `
			: "";
		return reply.status(400).send({
			statusCode: error.statusCode,
			message: `Invalid request ${validationContext}input`,
			timestamp: new Date(),
		});
	}

	if (isZodError(error)) {
		const message = error.issues.map((issue) => {
			return `${issue.path[0]}: ${issue.message}`;
		});

		return reply.status(400).send({
			statusCode: 400,
			message,
			timestamp: new Date(),
		});
	}

	if (isFlowError(error)) {
		return reply.status(error.statusCode).send({
			statusCode: error.statusCode,
			message: error.message,
			timestamp: new Date(),
		});
	}

	process.stdout.write(
		`\n\n\x1b[41m--- UNEXPECTED ERROR --- \x1b[0m\n ${
			Object.keys(error).length ? JSON.stringify(error) : genericError
		}\n\x1b[41m--- END UNEXPECTED ERROR --- \x1b[0m\n\n\n`,
	);
	return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
		statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
		message: HttpStatus[500],
		timestamp: new Date(),
	});
};

export const httpException = (
	message: string | string[],
	statusCode: number,
) => {
	return { message, statusCode };
};
