import { UserMiddleware } from "./../../../../../src/v1/modules/user/user.middleware";

describe("Unit tests for user middleware", () => {
	describe("findById", () => {
		it("should call the next function without error", async () => {
			const userMiddleware = new UserMiddleware();

			const requestMock = {};
			const replyMock = {};
			const doneMock = jest.fn();

			await userMiddleware.findById(requestMock, replyMock, doneMock);

			expect(doneMock).toHaveBeenCalledWith();
		});
	});
});
