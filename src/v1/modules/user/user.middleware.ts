import { preHandlerMetaHookHandler } from "fastify/types/hooks";

export class UserMiddleware {
	public async findById(
		request,
		reply,
		done,
	): Promise<preHandlerMetaHookHandler> {
		console.log("UserMiddleware.findById");

		return done();
	}
}
