const isZodError = (error: any): boolean => {
	return !!error.issues;
};

const isFlowError = (error: any): boolean => {
	return error.message && error.statusCode;
};

export const errorHandler = (genericError: any) => {
	const error = { ...genericError };

	if (isZodError(error)) {
		const message = error.issues.map((issue) => {
			return `${issue.path[0]}: ${issue.message}`;
		});
		process.stdout.write(
			`\n\n\x1b[41m--- ZOD ERROR --- \x1b[0m\n ${JSON.stringify(
				message,
			)}\n\x1b[41m--- END ERROR --- \x1b[0m\n\n\n`,
		);
	}

	if (isFlowError(error)) {
		process.stdout.write(
			`\n\n\x1b[41m--- FLOW ERROR --- \x1b[0m\n ${JSON.stringify(
				error.message,
			)}\n\x1b[41m--- END ERROR --- \x1b[0m\n\n\n`,
		);
	}

	process.stdout.write(
		`\n\n\x1b[41m--- UNEXPECTED ERROR --- \x1b[0m\n ${
			Object.keys(error).length ? JSON.stringify(error) : genericError
		}\n\x1b[41m--- END UNEXPECTED ERROR --- \x1b[0m\n\n\n`,
	);
};

export const exception = (message: string | string[]) => {
	return { message };
};
