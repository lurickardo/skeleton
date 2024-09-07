class Logger {
	private logMessage: string;

	constructor(logMessage?: string) {
		this.logMessage = logMessage || "";
	}

	static async asyncLog(message: string) {
		return new Promise<void>((resolve) => {
			process.stdout.write(`\n\x1b[33m${message}\x1b[0m`);
			resolve();
		});
	}

	log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = async (...args: any[]) => {
			await Logger.asyncLog(
				`${this.logMessage} ${propertyKey} with arguments: ${JSON.stringify(args)}`,
			);
			try {
				const result = await originalMethod.apply(this, args);

				await Logger.asyncLog(
					`Method: ${propertyKey} return: ${JSON.stringify(result)}`,
				);
				return result;
			} catch (error) {
				await Logger.asyncLog(`Method: ${propertyKey} Error: ${error.message}`);
				throw error;
			}
		};

		return descriptor;
	}
}

export const Log = (logMessage?: string) => {
	const logger = new Logger(logMessage);
	return logger.log.bind(logger);
};
