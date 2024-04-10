import { env } from "../../../config";
import { validateSendNotification, validateSendNotifications } from "./dto";
import { notificationService } from "./notification.service";

export const notificationQueues: Queue[] = [
	{
		name: env.channel.queues.notificationsQueue,
		service: notificationService.sendNotifications,
		validate: validateSendNotifications,
		options: { durable: true },
	},
	{
		name: env.channel.queues.notificationQueue,
		service: notificationService.sendNotification,
		validate: validateSendNotification,
		options: { durable: true },
	},
];
