import { queues } from "./app.module";
import { clusterize } from "./clusterize";
import { env } from "./config";
import { errorHandler } from "./config/error";
import * as amqp from "amqplib";

async function bootstrap(): Promise<void> {
	try {
		const connection = await amqp.connect(env.app.amqpUrl);
		const channel = await connection.createChannel();

		await channel.assertExchange(
			env.channel.exchange.name,
			env.channel.exchange.type,
			{ durable: true },
		);
		process.stdout.write(
			`[*] awaiting messages at exchange ${env.channel.exchange.name}...\n`,
		);
		await queues(channel);
	} catch (error) {
		errorHandler(error);
	}
}

clusterize(bootstrap);
