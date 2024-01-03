import * as Cluster from "cluster";
const cluster = Cluster as any;
import { cpus } from "os";

export default (bootstrap: any) => {
	if (cluster.isPrimary) {
		const numCPUs: number = cpus().length;
		for (let i = 0; i < numCPUs; i++) cluster.fork();
		cluster.on("exit", () => cluster.fork());
		return;
	}
	bootstrap();
};
