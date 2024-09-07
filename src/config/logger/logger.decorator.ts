export class Logger {
	public asyncLog = async (message: string): Promise<void> => {
		return new Promise<void>((resolve) => {
			process.stdout.write(`\x1b[33m${message}\x1b[0m`);
			resolve();
		});
	};

	static Log = (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor,
	): any => {
		const originalMethod = descriptor.value;
		const logger = new Logger();

		descriptor.value = async (...args: any[]) => {
			await logger.asyncLog(
				`\n\nCalling ${propertyKey} with arguments: ${JSON.stringify(args)}`,
			);

			try {
				const result = await originalMethod.apply(this, args);
				await logger.asyncLog(`\n\nResult: ${JSON.stringify(result)}`);
				return result;
			} catch (error) {
				await logger.asyncLog(`\n\nError: ${error}`);
				throw error;
			}
		};
	};
}
