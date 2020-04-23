import { Router } from 'express';

import questions from './controllers/questions.controller';
import answers from './controllers/answers.controller';
import results from './controllers/results.controller';
import statistics from './controllers/statistics.controller';
import test from './controllers/test.controller';

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
