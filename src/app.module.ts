import { Channel } from "amqplib";
import { Queue } from "./@types/Queue";
import { env } from "./config";
import { errorHandler } from "./config/error";
import { bufferToObject } from "./config/utils";
import { notificationQueues } from "./v1/modules/notification/notification.queue";

const bindQueues = (channel: Channel, queues: Queue[]) => {
	queues.forEach(async (queue) => {
		await channel.assertQueue(queue.name, queue.options);
		await channel.bindQueue(queue.name, env.channel.exchange.name, "");
		channel.consume(
			queue.name,
			({ content }) => {
				try {
					return queue.service(queue.validate(bufferToObject(content)));
				} catch (error) {
					errorHandler(error, queue.name);
				}
			},
			{ noAck: true },
		);
	});
};

export const queues = async (channel: Channel): Promise<void> => {
	bindQueues(channel, [...notificationQueues]);
};
