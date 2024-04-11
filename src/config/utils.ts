export const bufferToObject = (buffer: Buffer): any => {
	return JSON.parse(buffer.toString());
};
