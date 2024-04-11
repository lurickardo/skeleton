import * as amqp from "amqplib";
import { env } from "./config";
import { clusterize } from "./clusterize";
import { queues } from "./app.module";

async function bootstrap(): Promise<void> {
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
}

clusterize(bootstrap);
