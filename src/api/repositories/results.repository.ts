import * as Helpers from '../../utils/helpers';
import { Result } from '../../models';

export class ResultsRepository {
	constructor(private db: any) {}

	getResults(err: (error) => void, result: (result: Result[]) => void): void {
		this.db.query(`SELECT * FROM results;`, [], (error: any, db_res: any) => {
			if (error) {
				err(error);
				return;
			}
			result(db_res.rows);
		});
	}

	getResult(
		str_id: string,
		err: (error) => void,
		result: (result: Result) => void
	): void {
		this.db.query(
			`SELECT * FROM results WHERE results.str_id = $1;`,
			[str_id],
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				result(db_res.rows[0]);
			}
		);
	}

	createResult(
		startTime: Date,
		endTime: Date,
		primaryId: number,
		secondaryId: number,
		err: (error) => void,
		result: (resultId: number, stringId: string) => void
	): void {
		const start = Math.round(+new Date(startTime) / 1000);
		const end = Math.round(+new Date(endTime) / 1000);
		this.db.query(
			`	INSERT INTO results
					(str_id, start_date, complete_date, primary_profile_id, secondary_profile_id)
				VALUES
					($1, to_timestamp($2), to_timestamp($3), $4, $5)
				RETURNING id, str_id;
			`,
			[Helpers.makeid(20), start, end, primaryId, secondaryId],
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				result(db_res.rows[0].id, db_res.rows[0].str_id);
			}
		);
	}

	deleteResult(
		id: number,
		err: (error) => void,
		result: (result: Result) => void
	): void {
		this.db.query(
			`	DELETE FROM results WHERE id = $1 RETURNING *;`,
			[id],
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				const primaryId = db_res.rows[0].primary_profile_id;
				const secondaryId = db_res.rows[0].secondary_profile_id;
				this.db.query(
					`DELETE FROM profiles WHERE id IN ($1, $2);`,
					[primaryId, secondaryId],
					(error_2: any, db_res_2: any) => {
						if (error_2) {
							err(error_2);
							return;
						}
						result(db_res.rows[0]);
					}
				);
			}
		);
	}

	getDurations(err: (error) => void, result: (result: any) => void): void {
		this.db.query(
			`SELECT start_date, complete_date FROM results`,
			[],
			(error: any, db_res: any) => {
				const now = new Date().toLocaleString();
				if (error) {
					err(error);
					return;
				}
				result(db_res.rows);
			}
		);
	}
}
