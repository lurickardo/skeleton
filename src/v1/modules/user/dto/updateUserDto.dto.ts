import { z } from "zod";

const updateUserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export const transformUpdateUserDto = (data): UpdateUserDto => {
	return updateUserSchema.parse(data);
};
