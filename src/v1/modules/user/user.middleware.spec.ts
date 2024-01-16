import { userMiddleware } from "./user.middleware";

describe("Unit tests for user middleware", () => {
	describe("findById", () => {
		it("should call the next function without error", async () => {
			const requestMock = {};
			const replyMock = {};
			const doneMock = jest.fn();

			await userMiddleware.findById(requestMock, replyMock, doneMock);

			expect(doneMock).toHaveBeenCalledWith();
		});
	});
});
