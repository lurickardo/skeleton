import * as HttpStatus from "http-status";

export const errorHandler = (error, request, reply) => {
	if (error.message && error.statusCode) {
		return reply.status(error.statusCode).send({
			statusCode: error.statusCode,
			message: error.message,
			timestamp: new Date(),
		});
	}

	console.error(`\n${error}\n`);
	return reply
		.status(HttpStatus.INTERNAL_SERVER_ERROR)
		.send({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: HttpStatus[500],
			timestamp: new Date(),
		});
};

export const httpException = (message: string, statusCode: number) => {
	return { message, statusCode };
};
