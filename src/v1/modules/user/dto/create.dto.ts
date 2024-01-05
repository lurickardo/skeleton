export type createUserDto = {
	name: string;
	email: string;
};

export const transformUserDto = ({ name, email }: any): createUserDto => {
	return {
		name,
		email,
	};
};
