import * as application from "../../package.json";

export const env = Object.freeze({
	app: {
		port: Number(process.env.PORT),
		environment: process.env.APP_ENVIRONMENT,
		serverlessOffline: process.env.SERVERLESS_OFFLINE,
	},
	plugins: {
		swagger: {
			basePath: Object.is(process.env.USE_ROUTE_PREFIX, "true")
				? `/api/${application.name.replace(/-/g, "")}/`
				: "/",
		},
	},
	stripPrefix: {
		path: `/api/${application.name.replace(/-/g, "")}`,
	},
	db: {
		name: process.env.DB_NAME,
		url: process.env.DB_URL,
	},
} as any);
