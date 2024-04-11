import { SendNotificationsDto } from "./dto/sendNotifications.dto";
import { SendNotificationDto } from "./dto/sendNotification.dto";

export const notificationService = {
	sendNotification: async (sendNotificationDto: SendNotificationDto) => {
		console.info(sendNotificationDto);
	},
	sendNotifications: async (sendNotificationsDto: SendNotificationsDto) => {
		console.info(sendNotificationsDto);
	},
};
