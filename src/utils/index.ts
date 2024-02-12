import { httpException } from "../config/error";

export const getToken = (authorization: string): string => {
	const token = authorization.split(" ")?.[1] || authorization;
	if (!token) throw httpException("Token not sent.", 401);
	return token;
};
