import { Router } from 'express';
import { db } from '../../db';
import { TestService } from '../../services/test.service';
import { TestState } from '../../models/test-state';

const TestRoute = Router();
const testService = new TestService();

export default (app: Router) => {
	TestRoute.post('/', (req, res, next) => {
		db.query(
			`	SELECT q.*,
					(SELECT json_agg(a1)
					FROM answers a1
					WHERE q.id = a1.question_id)
				AS answers
				FROM questions q;
			`,
			[],
			(err: any, result: any) => {
				if (err) {
					return next(err);
				}
				const state: TestState = req.body;
				const newState: TestState | null = testService.nextState(
					state,
					result.rows
				);
				if (!newState) {
					return res
						.status(500)
						.send({ error: 'Server error during state calculation' });
				} else if (newState.end_time) {
					// TODO: save answers
					res.send(newState);
				} else {
					res.send(newState);
				}
			}
		);
	});

	app.use('/test', TestRoute);
};
