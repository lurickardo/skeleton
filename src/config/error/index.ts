const isZodError = (error: any): boolean => {
	return !!error.issues;
};

const isFlowError = (error: any): boolean => {
	return error.message && error.statusCode;
};

export const errorHandler = (genericError: any, queue: string) => {
	const error = { ...genericError };

	if (isZodError(error)) {
		const message = error.issues.map((issue) => {
			return `${issue.path[0]}: ${issue.message}`;
		});
		return process.stdout.write(
			`\n\n\x1b[41m--- ZOD ERROR --- \x1b[0m\n\n${JSON.stringify(
				message,
			)}\n\n\x1b[41mQUEUE:\x1b[0m ${queue}\n\n\x1b[41m--- END ERROR --- \x1b[0m\n\n\n`,
		);
	}

	if (isFlowError(error)) {
		return process.stdout.write(
			`\n\n\x1b[41m--- FLOW ERROR --- \x1b[0m\n\n${JSON.stringify(
				error.message,
			)}\n\n\x1b[41mQUEUE:\x1b[0m ${queue}\n\n\x1b[41m--- END ERROR --- \x1b[0m\n\n\n`,
		);
	}

	return process.stdout.write(
		`\n\n\x1b[41m--- UNEXPECTED ERROR --- \x1b[0m\n\n${
			Object.keys(error).length ? JSON.stringify(error) : genericError
		}\n\n\x1b[41mQUEUE:\x1b[0m ${queue}\n\n\x1b[41m--- END UNEXPECTED ERROR --- \x1b[0m\n\n\n`,
	);
};

export const exception = (message: string | string[]) => {
	console.info({ message });
};
