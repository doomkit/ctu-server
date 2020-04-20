import { Router } from 'express';

import questions from './routes/questions';
import answers from './routes/answers';
import results from './routes/results';
import statistics from './routes/statistics';
import test from './routes/test';

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
