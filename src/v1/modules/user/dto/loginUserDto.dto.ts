import { z } from "zod";

const loginUserSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;

export const transformLoginUserDto = (data): LoginUserDto => {
	return loginUserSchema.parse(data);
};
