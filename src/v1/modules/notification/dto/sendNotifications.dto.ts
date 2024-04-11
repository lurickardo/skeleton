import { z } from "zod";
import { Base64 } from "js-base64";

const sendNotificationsSchema = z.object({
	notifications: z
		.array(
			z.object({
				title: z.string().min(1).max(50),
				recipients: z.array(z.string().email().max(256)).nonempty(),
				body: z.string().min(1).max(1000),
				attachments: z.array(z.string().refine(Base64.isValid)).optional(),
			}),
		)
		.nonempty(),
});

export type SendNotificationsDto = z.infer<typeof sendNotificationsSchema>;

export const validateSendNotifications = (data: any): SendNotificationsDto => {
	return sendNotificationsSchema.parse(data);
};
