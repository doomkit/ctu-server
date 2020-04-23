import { Answer } from '../../models';

export class AnswersRepository {
	constructor(private db: any) {}

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
}
