import { FastifyReply, FastifyRequest } from "fastify";
import * as HttpStatus from "http-status";

export const errorHandler = (
	genericError: any,
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const error = JSON.parse(JSON.stringify(genericError));

	if (error.issues) {
		const message = error.issues.map((error) => {
			return error.message;
		});

		return reply.status(400).send({
			statusCode: 400,
			message,
			timestamp: new Date(),
		});
	}

	if (error.message && error.statusCode) {
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
