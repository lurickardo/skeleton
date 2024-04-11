export type Queue = {
	name: string;
	service: (genericDto: any) => void | Promise<void>;
	validate: (data: any) => any;
	options?: Options.AssertQueue;
};
