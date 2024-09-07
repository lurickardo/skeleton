import type { preHandlerMetaHookHandler } from "fastify/types/hooks";

export class UserMiddleware {
	public findById = async (
		request,
		reply,
		done,
	): Promise<preHandlerMetaHookHandler> => {
		return done();
	};
}
