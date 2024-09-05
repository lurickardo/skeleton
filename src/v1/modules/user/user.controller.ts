import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import { transformCreateUserDto, transformUpdateUserDto } from "./dto";
import { UserService } from "./user.service";

export class UserController {
	private userService = new UserService();

	public async findById(
		{ params: { id } },
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> {
		return reply.code(200).send(await this.userService.findById(id));
	}

	public async listAll(
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> {
		return reply.code(200).send(await this.userService.listAll());
	}

	public async create(
		{ body }: FastifyRequest,
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> {
		return reply
			.code(201)
			.send(await this.userService.create(transformCreateUserDto(body)));
	}

	public async update(
		{ params: { id }, body },
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> {
		return reply
			.code(200)
			.send(await this.userService.update(id, transformUpdateUserDto(body)));
	}

	public async remove(
		{ params: { id } },
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> {
		return reply.code(200).send(await this.userService.remove(id));
	}
}
