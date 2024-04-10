import { z } from "zod";

const sendNotificationSchema = z.object({
	name: z.string(),
	email: z.string().email(),
});

export type SendNotificationDto = z.infer<typeof sendNotificationSchema>;

export const validateSendNotification = (data: any): SendNotificationDto => {
	return sendNotificationSchema.parse(data);
};
