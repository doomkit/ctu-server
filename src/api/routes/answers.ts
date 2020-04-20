import { Router } from 'express';
import { db } from '../../db';
import { Answer } from '../../models';

const AnswersRoute = Router();
export default (app: Router) => {
	AnswersRoute.post('/', (req, res, next) => {
		const answer = req.body as Answer;
		db.query(
			`INSERT INTO answers (question_id, content_en, content_cz) VALUES ($1, $2, $3) RETURNING *`,
			[answer.question_id, answer.content_en, answer.content_cz],
			(err: any, db_res: any) => {
				if (err) {
					console.log(
						new Date().toLocaleString() + ' LOG: Create answer ERROR'
					);
					return next(err);
				}
				console.log(new Date().toLocaleString() + ' LOG: Create answer OK');
				res.send(db_res.rows[0]);
			}
		);
	});

	AnswersRoute.delete('/:id', (req, res, next) => {
		const answer = req.body as Answer;
		db.query(
			`DELETE from answers WHERE id = $1`,
			[req.params.id],
			(err: any, db_res: any) => {
				if (err) {
					console.log(
						new Date().toLocaleString() + ' LOG: Delete answer ERROR'
					);
					return next(err);
				}
				console.log(new Date().toLocaleString() + ' LOG: Delete answer OK');
				res.send(db_res.rows[0]);
			}
		);
	});

	app.use('/answers', AnswersRoute);
};
