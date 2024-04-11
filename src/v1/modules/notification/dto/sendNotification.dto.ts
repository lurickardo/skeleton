import { z } from "zod";
import { Base64 } from "js-base64";

const sendNotificationSchema = z.object({
	title: z.string().min(1).max(50),
	recipients: z.array(z.string().email().max(256)).nonempty(),
	body: z.string().min(1).max(1000),
	attachments: z.array(z.string().refine(Base64.isValid)).optional(),
});

export type SendNotificationDto = z.infer<typeof sendNotificationSchema>;

export const validateSendNotification = (data: any): SendNotificationDto => {
	return sendNotificationSchema.parse(data);
};
