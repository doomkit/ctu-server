import * as dotenv from 'dotenv';

export const loadEnv = () => {
	dotenv.config();
	let path;
	switch (process.env.NODE_ENV) {
		case 'prod':
			path = `${__dirname}/../../.env`;
			break;
		default:
			path = `${__dirname}/../../.env.dev`;
	}
	dotenv.config({ path: path });
};
