import { FastifyReply, FastifyRequest } from "fastify";
import * as HttpStatus from "http-status";

export const errorHandler = (
	error,
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	if (error.message && error?.statusCode) {
		return reply.status(error.statusCode).send({
			statusCode: error.statusCode,
			message: error.message,
			timestamp: new Date(),
		});
	}

	console.error(
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
