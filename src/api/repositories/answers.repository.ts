import { Answer } from '../../models';

export class AnswersRepository {
	constructor(private db: any) {}

	createAnswer(
		answer: Answer,
		err: (error) => void,
		result: (answer: Answer) => void
	) {
		this.db.query(
			`	INSERT INTO answers (question_id, content_en, content_cz, params)
				VALUES ($1, $2, $3, $4) RETURNING *
			`,
			[answer.question_id, answer.content_en, answer.content_cz, answer.params],
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				result(db_res.rows[0]);
			}
		);
	}

	saveAnswers(
		answers: Answer[],
		resultId: number,
		err: (error) => void,
		result: () => void
	): void {
		const mappedAnswers = answers.map((answer) => {
			return {
				id: answer.id,
				result_id: resultId,
			};
		});
		this.db.query(
			`	INSERT INTO results_answers (answer_id, result_id)
				SELECT id, result_id
				FROM jsonb_to_recordset($1::jsonb) AS t (id int, result_id int)
			`,
			[JSON.stringify(mappedAnswers)],
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				result();
			}
		);
	}

	deleteAnswer(
		id: number,
		err: (error) => void,
		result: (answer: Answer) => void
	) {
		this.db.query(
			`DELETE from answers WHERE id = $1`,
			[id],
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				result(db_res.rows[0]);
			}
		);
	}
}
