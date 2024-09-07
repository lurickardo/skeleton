import type { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import { transformCreateUserDto, transformUpdateUserDto } from "./dto";
import { UserService } from "./user.service";

export class UserController {
	private userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	public findById = async (
		{ params: { id } },
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> => {
		return reply.code(200).send(await this.userService.findById(id));
	};

	public listAll = async (
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> => {
		return reply.code(200).send(await this.userService.listAll());
	};

	public create = async (
		{ body }: FastifyRequest,
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> => {
		return reply
			.code(201)
			.send(await this.userService.create(transformCreateUserDto(body)));
	};

	public update = async (
		{ params: { id }, body },
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> => {
		return reply
			.code(200)
			.send(await this.userService.update(id, transformUpdateUserDto(body)));
	};

	public remove = async (
		{ params: { id } },
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> => {
		return reply.code(200).send(await this.userService.remove(id));
	};
}
