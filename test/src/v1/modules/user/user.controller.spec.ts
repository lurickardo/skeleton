import { UserService } from "./../../../../../src/v1/modules/user/user.service";
import { UserController } from "./../../../../../src/v1/modules/user/user.controller";

jest.mock("./../../../../../src/v1/modules/user/user.service");

describe("Unit tests for user controller", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("findById", () => {
		it("should return a user with status 200 if found user", async () => {
			const userService = new UserService();
			const userController = new UserController();

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
				const userService = new UserService();
				const userController = new UserController();

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
			const userService = new UserService();
			const userController = new UserController();

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

	describe("listAll", () => {
		it("should return a list of users with status 200", async () => {
			const userService = new UserService();
			const userController = new UserController();

			const userListMock = [
				{ id: "1", name: "John Doe", email: "john@example.com" },
				{ id: "2", name: "Jane Doe", email: "jane@example.com" },
			];
			(userService.listAll as jest.Mock).mockResolvedValue(userListMock);

			const replyMock = {
				code: jest.fn().mockReturnThis(),
				send: jest.fn(),
			} as any;

			const body: any = { body: {} };

			await userController.listAll(body, replyMock);

			expect(replyMock.code).toHaveBeenCalledWith(200);
			expect(replyMock.send).toHaveBeenCalledWith(userListMock);
		});
	});

	describe("update", () => {
		it("should update a user and return status 200", async () => {
			const userService = new UserService();
			const userController = new UserController();

			const userId = "123";
			const updatedUserDtoMock = {
				name: "Updated Name",
				email: "updated@example.com",
			};
			const updatedUserMock = { id: userId, ...updatedUserDtoMock };
			(userService.update as jest.Mock).mockResolvedValue(updatedUserMock);

			const replyMock = {
				code: jest.fn().mockReturnThis(),
				send: jest.fn(),
			} as any;

			const params: any = { params: { id: userId } };
			const body: any = { body: updatedUserDtoMock };

			await userController.update({ ...params, ...body }, replyMock);

			expect(replyMock.code).toHaveBeenCalledWith(200);
			expect(replyMock.send).toHaveBeenCalledWith(updatedUserMock);
			expect(userService.update).toHaveBeenCalledWith(
				userId,
				updatedUserDtoMock,
			);
		});

		it("should return a 404 status if the user is not found", async () => {
			try {
				const userService = new UserService();
				const userController = new UserController();

				const userId: any = null;
				const updatedUserDtoMock = {
					name: "Updated Name",
					email: "updated@example.com",
				};
				(userService.update as jest.Mock).mockResolvedValue(null);

				const replyMock = {
					code: jest.fn().mockReturnThis(),
					send: jest.fn(),
				} as any;

				await userController.update(
					{ params: { id: userId }, body: updatedUserDtoMock },
					replyMock,
				);
			} catch (error) {
				expect(error.statusCode).toHaveBeenCalledWith(404);
				expect(error.message).toHaveBeenCalledWith({ error: "User not found" });
			}
		});
	});

	describe("remove", () => {
		it("should remove a user and return status 200", async () => {
			const userService = new UserService();
			const userController = new UserController();

			const userId = "123";
			(userService.remove as jest.Mock).mockResolvedValue({
				message: "User successfully removed",
			});

			const replyMock = {
				code: jest.fn().mockReturnThis(),
				send: jest.fn(),
			} as any;

			const params: any = { params: { id: userId } };

			await userController.remove(params, replyMock);

			expect(replyMock.code).toHaveBeenCalledWith(200);
			expect(replyMock.send).toHaveBeenCalledWith({
				message: "User successfully removed",
			});
			expect(userService.remove).toHaveBeenCalledWith(userId);
		});

		it("should return a 404 status if the user is not found", async () => {
			try {
				const userService = new UserService();
				const userController = new UserController();

				const userId: any = null;
				(userService.remove as jest.Mock).mockResolvedValue(null);

				const replyMock = {
					code: jest.fn().mockReturnThis(),
					send: jest.fn(),
				} as any;

				await userController.remove({ params: { id: userId } }, replyMock);
			} catch (error) {
				expect(error.statusCode).toHaveBeenCalledWith(404);
				expect(error.message).toHaveBeenCalledWith({ error: "User not found" });
			}
		});
	});
});
