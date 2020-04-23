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
				result(db_res.rows as Question[]);
			}
		);
	}

	getQuestionById(
		id: number,
		err: (error) => void,
		result: (questions: Question) => void
	): void {
		this.db.query(
			`	SELECT q.*,
					(SELECT json_agg(a1)
					FROM answers a1
					WHERE q.id = a1.question_id)
				AS answers
				FROM questions q
				WHERE q.id = $1;
			`,
			[id],
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				result(db_res.rows[0] as Question);
			}
		);
	}

	createQuestion(
		question: Question,
		err: (error) => void,
		result: (questions: Question) => void
	): void {
		this.db.query(
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
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				result(db_res.rows[0] as Question);
			}
		);
	}

	deleteQuestion(
		id: number,
		err: (error) => void,
		result: (questions: Question) => void
	): void {
		this.db.query(
			`DELETE from questions WHERE id = $1;`,
			[id],
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				result(db_res.rows[0] as Question);
			}
		);
	}
}
