import type { FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "./../../../../../src/v1/modules/user/user.controller";
import { UserService } from "./../../../../../src/v1/modules/user/user.service";
import {
	transformCreateUserDto,
	transformUpdateUserDto,
} from "./../../../../../src/v1/modules/user/dto";

jest.mock("./../../../../../src/v1/modules/user/user.service");
jest.mock("./../../../../../src/v1/modules/user/dto");

describe("UserController", () => {
	let userController: UserController;
	let userServiceMock: jest.Mocked<UserService>;
	let replyMock: jest.Mocked<FastifyReply>;

	beforeEach(() => {
		userController = new UserController();
		userServiceMock = new UserService() as jest.Mocked<UserService>;
		replyMock = {
			code: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as unknown as jest.Mocked<FastifyReply>;

		(userController as any).userService = userServiceMock;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should find a user by ID", async () => {
		const mockUser = {
			_id: "1",
			name: "Jhon Doe",
			email: "jhondoe@gmail.com",
		};
		userServiceMock.findById.mockResolvedValue(mockUser);

		const request = { params: { id: "1" } };
		await userController.findById(request, replyMock);

		expect(userServiceMock.findById).toHaveBeenCalledWith("1");
		expect(replyMock.code).toHaveBeenCalledWith(200);
		expect(replyMock.send).toHaveBeenCalledWith(mockUser);
	});

	it("should list all users", async () => {
		const mockUsers = [
			{
				_id: "1",
				name: "Jhon Doe",
				email: "jhondoe@gmail.com",
			},
			{
				_id: "2",
				name: "Foo Bar",
				email: "foobar@gmail.com",
			},
		];
		userServiceMock.listAll.mockResolvedValue(mockUsers);

		const request = {} as FastifyRequest;
		await userController.listAll(request, replyMock);

		expect(userServiceMock.listAll).toHaveBeenCalled();
		expect(replyMock.code).toHaveBeenCalledWith(200);
		expect(replyMock.send).toHaveBeenCalledWith(mockUsers);
	});

	it("should create a user", async () => {
		const mockUser = { _id: "1", name: "Jhon Dow", email: "jhondoe@gmail.com" };
		const dto = { name: "Jhon Dow", email: "jhondoe@gmail.com" };
		userServiceMock.create.mockResolvedValue(mockUser);

		const request = { body: dto } as FastifyRequest;
		await userController.create(request, replyMock);

		expect(transformCreateUserDto).toHaveBeenCalledWith(dto);
		expect(replyMock.code).toHaveBeenCalledWith(201);
		expect(replyMock.send).toHaveBeenCalledWith(mockUser);
	});

	it("should update a user", async () => {
		const mockUser = { _id: "1", name: "Jhon Dow", email: "jhondoe@gmail.com" };
		const dto = { name: "Jhon Dow", email: "jhondoe@gmail.com" };
		userServiceMock.update.mockResolvedValue(mockUser);

		const request = {
			params: { id: "1" },
			body: dto,
		};

		await userController.update(request, replyMock);

		expect(transformUpdateUserDto).toHaveBeenCalledWith(dto);
		expect(replyMock.code).toHaveBeenCalledWith(200);
		expect(replyMock.send).toHaveBeenCalledWith(mockUser);
	});

	it("should delete a user", async () => {
		userServiceMock.remove.mockResolvedValue({ message: "User deleted" });

		const request = { params: { id: "1" } };
		await userController.remove(request, replyMock);

		expect(userServiceMock.remove).toHaveBeenCalledWith("1");
		expect(replyMock.code).toHaveBeenCalledWith(200);
		expect(replyMock.send).toHaveBeenCalledWith({ message: "User deleted" });
	});
});
