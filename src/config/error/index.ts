import { FastifyReply, FastifyRequest } from "fastify";
import * as HttpStatus from "http-status";

const isFastifyError = (error: any): boolean => {
	return error.code || (error.statusCode && !error.message);
};

const isZodError = (error: any): boolean => {
	return !!error.issues;
};

const isFlowError = (error: any): boolean => {
	return error.message && error.statusCode;
};

const isJwtError = (error: any): boolean => {
	return error.name && error.message;
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
		return reply.status(HttpStatus.BAD_REQUEST).send({
			statusCode: error.statusCode,
			message: `Invalid request ${validationContext}input`,
			timestamp: new Date(),
		});
	}

	if (isJwtError(error)) {
		if (error.name === "TokenExpiredError")
			return reply.status(HttpStatus.BAD_REQUEST).send({
				statusCode: HttpStatus.BAD_REQUEST,
				message: "Expired token.",
				timestamp: new Date(),
			});
		if (error.name === "JsonWebTokenError")
			return reply.status(HttpStatus.BAD_REQUEST).send({
				statusCode: HttpStatus.BAD_REQUEST,
				message: "Invalid token.",
				timestamp: new Date(),
			});

		return reply.status(HttpStatus.BAD_REQUEST).send({
			statusCode: HttpStatus.BAD_REQUEST,
			message: "Access denied.",
			timestamp: new Date(),
		});
	}

	if (isZodError(error)) {
		const message = error.issues.map((error) => {
			return error.message;
		});

		return reply.status(HttpStatus.BAD_REQUEST).send({
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
		`\n \x1b[41m--- UNEXPECTED ERROR --- \x1b[0m\n ${error}\n \x1b[41m--- END UNEXPECTED ERROR --- \x1b[0m\n`,
	);
	return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
		statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
		message: HttpStatus[500],
		timestamp: new Date(),
	});
};

export const httpException = (message: string, statusCode: number) => {
	return { message, statusCode };
};
