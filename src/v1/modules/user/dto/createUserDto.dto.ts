import { z } from "zod";

const createUserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const transformCreateUserDto = (data): CreateUserDto => {
	return createUserSchema.parse(data);
};
