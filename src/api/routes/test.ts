import { Router } from 'express';
import { db } from '../../db';
import { TestService } from '../../services/test.service';
import { TestState } from '../../models/test-state';
import { makeid } from '../../utils/helpers';

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
			(err_1: any, db_res_1: any) => {
				const now = new Date().toLocaleString();
				if (err_1) {
					console.log(now + ' LOG: Get next test state ERROR');
					return next(err_1);
				}

				const state: TestState = req.body;
				const newState: TestState | null = testService.nextState(
					state,
					db_res_1.rows
				);
				if (!newState) {
					console.log(now + ' Server error during state calculation');
					return res
						.status(500)
						.send({ error: 'Server error during state calculation' });
				} else if (newState.end_time) {
					const result = testService.calculateResult(newState);
					if (!result) {
						return res
							.status(500)
							.send({ error: 'Server error during state calculation' });
					}
					const primaryProfileValues: (number | string)[] = Object.values(
						result.primary_profile
					);
					const secondaryProfile: (number | string)[] = Object.values(
						result.secondary_profile
					);
					db.query(
						`INSERT INTO profiles
								(corresponding_type, communication, experience, expectations, people, knowledge, resources, specificity)
							VALUES
								($1, $2, $3, $4, $5, $6, $7, $8),
								($9, $10, $11, $12, $13, $14, $15, $16)
							RETURNING id;
						`,
						[...primaryProfileValues, ...secondaryProfile],
						(err_2: any, db_res_2: any) => {
							if (err_2) {
								console.log(now + ' LOG: Create profiles ERROR');
								return next(err_2);
							}
							console.log(now + ' LOG: Create profiles OK');
							const primaryId = db_res_2.rows[0].id;
							const secondaryId = db_res_2.rows[1].id;
							const start = Math.round(
								+new Date(newState.start_time as Date) / 1000
							);
							const end = Math.round(
								+new Date(newState.end_time as Date) / 1000
							);
							db.query(
								`	INSERT INTO results
										(str_id, start_date, complete_date, primary_profile_id, secondary_profile_id)
									VALUES
										($1, to_timestamp($2), to_timestamp($3), $4, $5)
									RETURNING id, str_id;
								`,
								[makeid(20), start, end, primaryId, secondaryId],
								(err_3: any, db_res_3: any) => {
									if (err_3) {
										console.log(now + ' LOG: Create result ERROR');
										return next(err_3);
									}
									console.log(now + ' LOG: Create result OK');
									newState.result_str_id = db_res_3.rows[0].str_id;
									const result_id = db_res_3.rows[0].id;
									const user_answers = newState.answers.map((answer) => {
										return {
											id: answer.id,
											result_id,
										};
									});
									db.query(
										`INSERT INTO results_answers (answer_id, result_id)
										 SELECT id, result_id
										 	FROM jsonb_to_recordset($1::jsonb) AS t (id int, result_id int)
										 `,
										[JSON.stringify(user_answers)],
										(err_4: any, db_res_4: any) => {
											if (err_4) {
												next(err_4);
												console.log(now + ' LOG: Save answers ERROR');
											}
											console.log(now + ' LOG: Save answers OK');
											res.send(newState);
											return;
										}
									);
								}
							);
						}
					);
				} else {
					console.log(now + ' LOG: Get next test state OK');
					res.send(newState);
				}
			}
		);
	});

	app.use('/test', TestRoute);
};
