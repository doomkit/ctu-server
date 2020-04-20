import express from 'express';
import { loadExpress } from './utils';
import { loadEnv } from './utils';

(async function startServer() {
	loadEnv();
	const app = express();
	await loadExpress({ app });
	app.listen(process.env.PORT || 3000, () => {
		console.log(`🚀 Server is ready on port ${process.env.PORT || 3000}!`);
	});
})();
