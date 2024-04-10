import { Channel } from "amqplib";
import { notificationQueues } from "./v1/modules/notification/notification.queue";
import { env } from "./config";

const bindQueues = (channel: Channel, queues: Queue[]) => {
	queues.forEach(async (queue) => {
		await channel.assertQueue(queue.name, queue.options);
		await channel.bindQueue(queue.name, env.channel.exchange.name, "");
		channel.consume(
			queue.name,
			(message: any) => {
				queue.service(queue.validate(message));
			},
			{ noAck: true },
		);
	});
};

export const queues = async (channel: Channel): Promise<void> => {
	bindQueues(channel, [...notificationQueues]);
};
