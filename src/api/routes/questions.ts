import { Router } from 'express';
import { db } from '../../db';
import { Question } from '../../models';

const QuestionsRoute = Router();
export default (app: Router) => {
	QuestionsRoute.get('/', (req, res, next) => {
		db.query(
			`	SELECT q.*,
					(SELECT json_agg(a1)
					FROM answers a1
					WHERE q.id = a1.question_id)
				AS answers
				FROM questions q;
			`,
			[],
			(err: any, db_res: any) => {
				if (err) {
					console.log(
						new Date().toLocaleString() + ' LOG: Delete questions ERROR'
					);
					return next(err);
				}
				console.log(new Date().toLocaleString() + ' LOG: Get questions OK');
				res.send(db_res.rows);
			}
		);
	});

	QuestionsRoute.get('/:id', (req, res, next) => {
		db.query(
			`	SELECT q.*,
					(SELECT json_agg(a1)
					FROM answers a1
					WHERE q.id = a1.question_id)
				AS answers
				FROM questions q
				WHERE q.id = $1;
			`,
			[req.params.id],
			(err: any, db_res: any) => {
				if (err) {
					console.log(new Date().toLocaleString() + ' LOG: Get question ERROR');
					return next(err);
				}
				console.log(new Date().toLocaleString() + ' LOG: Get question OK');
				res.send(db_res.rows[0]);
			}
		);
	});

	QuestionsRoute.post('/', (req, res, next) => {
		const question = req.body as Question;
		db.query(
			`	INSERT INTO questions(is_common, specification, content_en, content_cz)
				VALUES ($1, $2, $3, $4)
				RETURNING *;
			`,
			[
				question.is_common,
				question.specification ? question.specification : null,
				question.content_en,
				question.content_cz,
			],
			(err: any, db_res: any) => {
				if (err) {
					console.log(
						new Date().toLocaleString() + ' LOG: Create question ERROR'
					);
					return next(err);
				}
				console.log(new Date().toLocaleString() + ' LOG: Create question OK');
				res.send(db_res.rows[0]);
			}
		);
	});

	QuestionsRoute.delete('/:id', (req, res, next) => {
		db.query(
			`DELETE from questions WHERE id = $1;`,
			[req.params.id],
			(err: any, db_res: any) => {
				if (err) {
					console.log(
						new Date().toLocaleString() + ' LOG: Delete question ERROR'
					);
					return next(err);
				}
				console.log(new Date().toLocaleString() + ' LOG: Delete question OK');
				res.send(db_res.rows[0]);
			}
		);
	});

	app.use('/questions', QuestionsRoute);
};
