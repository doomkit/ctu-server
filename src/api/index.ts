import { Router } from 'express';

import questions from './controllers/questions';
import answers from './controllers/answers';
import results from './controllers/results';
import statistics from './controllers/statistics';
import test from './controllers/test';

// Mount all routes
export default () => {
	const app = Router();
	questions(app);
	answers(app);
	results(app);
	statistics(app);
	test(app);

	return app;
};
