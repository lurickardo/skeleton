import * as Cluster from "node:cluster";
import { cpus } from "node:os";

const cluster = Cluster as any;

export const clusterize = (bootstrap: () => void): void => {
	if (cluster.isPrimary) {
		const numCPUs: number = cpus().length;
		for (let i = 0; i < numCPUs; i++) cluster.fork();
		cluster.on("exit", () => cluster.fork());
		return;
	}
	bootstrap();
};
