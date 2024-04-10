type Env = {
	app: { amqpUrl: string; environment: string };
	database: { name: string; url: string };
	channel: {
		exchange: { name: string; type: string };
		queues: { notificationsQueue: string; notificationQueue: string };
	};
};

export const env = Object.freeze({
	app: {
		amqpUrl: process.env.AMQP_URL,
		environment: process.env.APP_ENVIRONMENT,
	},
	database: {
		name: process.env.DB_NAME,
		url: process.env.DB_URL,
	},
	channel: {
		exchange: {
			name: process.env.EXCHANGE_NAME,
			type: process.env.EXCHANGE_TYPE,
		},
		queues: {
			notificationsQueue: process.env.NOTIFICATIONS_QUEUE,
			notificationQueue: process.env.NOTIFICATION_QUEUE,
		},
	},
} as Env);
