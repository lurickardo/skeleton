import * as Cluster from "cluster";
import { cpus } from "os";

const cluster = Cluster as any;

export default (bootstrap: () => void): void => {
	if (cluster.isPrimary) {
		const numCPUs: number = cpus().length;
		for (let i = 0; i < numCPUs; i++) cluster.fork();
		cluster.on("exit", () => cluster.fork());
		return;
	}
	bootstrap();
};
