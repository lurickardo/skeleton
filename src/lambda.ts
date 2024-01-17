import awsLambdaFastify from "@fastify/aws-lambda";
import { bootstrap } from "./main";

export const handler = awsLambdaFastify(bootstrap(), {
	binaryMimeTypes: ["application/octet-stream"],
});
