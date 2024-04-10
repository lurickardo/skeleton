type Queue = {
	name: string;
	service: (message: any) => Promise<void>;
	validate: (data: any) => any;
	options?: Options.AssertQueue;
};
