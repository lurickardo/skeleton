import { exception } from "../../../../src/config/error";

export const notificationService = {
	sendNotification: async (message: any) => {
		try {
			console.log("sendNotification");
		} catch (error) {
			throw error;
		}
	},
	sendNotifications: async (message: any) => {
		try {
			console.log("sendNotificationsssssss");
		} catch (error) {
			throw error;
		}
	},
};
