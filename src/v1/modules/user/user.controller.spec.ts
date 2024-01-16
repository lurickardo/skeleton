import { userController } from "./user.controller";
import { userService } from "./user.service";

jest.mock("./user.service");

describe("Unit tests for user controller", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("findById", () => {
		it("should return a user with status 200 if found user", async () => {
			const userId = "123";
			const userMock = { id: userId, name: "John Doe" };
			(userService.findById as jest.Mock).mockResolvedValue(userMock);

			const replyMock = {
				code: jest.fn().mockReturnThis(),
				send: jest.fn(),
			} as any;

			await userController.findById({ params: { id: userId } }, replyMock);

			expect(replyMock.code).toHaveBeenCalledWith(200);
			expect(replyMock.send).toHaveBeenCalledWith(userMock);
		});

		it("should return a 404 status if the user is not found", async () => {
			try {
				const userId: any = null;
				(userService.findById as jest.Mock).mockResolvedValue(null);

				const replyMock = {
					code: jest.fn().mockReturnThis(),
					send: jest.fn(),
				} as any;

				await userController.findById({ params: { id: userId } }, replyMock);
			} catch (error) {
				expect(error.statusCode).toHaveBeenCalledWith(404);
				expect(error.message).toHaveBeenCalledWith({ error: "User not found" });
			}
		});
	});

	describe("create", () => {
		it("must create a user and return status 201", async () => {
			const userDtoMock = { name: "John Doe", email: "john@example.com" };
			const createdUserMock = { id: "123", ...userDtoMock };
			(userService.create as jest.Mock).mockResolvedValue(createdUserMock);

			const replyMock = {
				code: jest.fn().mockReturnThis(),
				send: jest.fn(),
			} as any;

			const body: any = { body: userDtoMock };

			await userController.create(body, replyMock);

			expect(replyMock.code).toHaveBeenCalledWith(201);
			expect(replyMock.send).toHaveBeenCalledWith(createdUserMock);
			expect(userService.create).toHaveBeenCalledWith(userDtoMock);
		});
	});
});
