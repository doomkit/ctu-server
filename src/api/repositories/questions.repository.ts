import { Question } from '../../models';

export class QuestionsRepository {
	constructor(private db: any) {}

	getQuestions(
		err: (error) => void,
		result: (questions: Question[]) => void
	): void {
		this.db.query(
			`	SELECT q.*,
					(SELECT json_agg(a1)
					FROM answers a1
					WHERE q.id = a1.question_id)
				AS answers
				FROM questions q;
			`,
			[],
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				result(db_res.row as Question[]);
			}
		);
	}
}
