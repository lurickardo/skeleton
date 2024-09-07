import type { FastifyReply, FastifyRequest } from "fastify";
import * as HttpStatus from "http-status";
import { errorHandler, httpException } from "../../../../src/config/error";

const replyMock = {
	status: jest.fn().mockReturnThis(),
	send: jest.fn(),
} as unknown as jest.Mocked<FastifyReply>;

describe("Error Handling Functions", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("errorHandler", () => {
		const requestMock = {} as FastifyRequest;

		it("should handle Fastify errors (isFastifyError)", () => {
			const error = {
				code: 500,
				statusCode: 400,
				validationContext: "Test",
			};

			errorHandler(error, requestMock, replyMock);

			expect(replyMock.status).toHaveBeenCalledWith(400);
			expect(replyMock.send).toHaveBeenCalledWith({
				statusCode: 400,
				message: "Invalid request Test input",
				timestamp: expect.any(Date),
			});
		});

		it("should handle Fastify errors (isFastifyError) without validationContext", () => {
			const error = {
				code: 500,
				statusCode: 400,
			};

			errorHandler(error, requestMock, replyMock);

			expect(replyMock.status).toHaveBeenCalledWith(400);
			expect(replyMock.send).toHaveBeenCalledWith({
				statusCode: 400,
				message: "Invalid request input",
				timestamp: expect.any(Date),
			});
		});

		it("should handle Zod errors (isZodError)", () => {
			const error = {
				issues: [{ path: ["field"], message: "Invalid input" }],
			};

			errorHandler(error, requestMock, replyMock);

			expect(replyMock.status).toHaveBeenCalledWith(400);
			expect(replyMock.send).toHaveBeenCalledWith({
				statusCode: 400,
				message: ["field: Invalid input"],
				timestamp: expect.any(Date),
			});
		});

		it("should handle Flow errors (isFlowError)", () => {
			const error = { message: "Flow error", statusCode: 404 };

			errorHandler(error, requestMock, replyMock);

			expect(replyMock.status).toHaveBeenCalledWith(404);
			expect(replyMock.send).toHaveBeenCalledWith({
				statusCode: 404,
				message: "Flow error",
				timestamp: expect.any(Date),
			});
		});

		it("should handle unexpected errors", () => {
			const error = { message: "Unexpected error" };

			const consoleSpy = jest.spyOn(process.stdout, "write");

			errorHandler(error, requestMock, replyMock);

			expect(replyMock.status).toHaveBeenCalledWith(
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
			expect(replyMock.send).toHaveBeenCalledWith({
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: HttpStatus[500],
				timestamp: expect.any(Date),
			});

			expect(consoleSpy).toHaveBeenCalled();
		});

		it("should handle unexpected errors with error are not object ", () => {
			const error = "";

			const consoleSpy = jest.spyOn(process.stdout, "write");

			errorHandler(error, requestMock, replyMock);

			expect(replyMock.status).toHaveBeenCalledWith(
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
			expect(replyMock.send).toHaveBeenCalledWith({
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: HttpStatus[500],
				timestamp: expect.any(Date),
			});

			expect(consoleSpy).toHaveBeenCalled();
		});
	});

	describe("httpException", () => {
		it("should return an exception object with message and statusCode", () => {
			const result = httpException("Some error", 400);
			expect(result).toEqual({ message: "Some error", statusCode: 400 });
		});

		it("should handle array of messages", () => {
			const result = httpException(["Error 1", "Error 2"], 500);
			expect(result).toEqual({
				message: ["Error 1", "Error 2"],
				statusCode: 500,
			});
		});
	});
});
