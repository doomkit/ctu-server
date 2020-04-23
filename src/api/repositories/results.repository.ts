import * as Helpers from '../../utils/helpers';

export class ResultsRepository {
	constructor(private db: any) {}

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

	getTimeSpent() {}
}
