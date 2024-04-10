import { z } from "zod";

const sendNotificationsSchema = z.object({
	name: z.string(),
	email: z.string().email(),
});

export type SendNotificationsDto = z.infer<typeof sendNotificationsSchema>;

export const validateSendNotifications = (data: any): SendNotificationsDto => {
	return sendNotificationsSchema.parse(data);
};
