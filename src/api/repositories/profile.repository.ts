import { Profile } from '../../models';

export class ProfileRepository {
	constructor(private db: any) {}

	createProfile(
		primary: Profile,
		secondary: Profile,
		err: (error) => void,
		result: (primaryId: number, secondaryId: number) => void
	): void {
		const primaryProfileValues = Object.values(primary);
		const secondaryProfile = Object.values(secondary);
		this.db.query(
			`	INSERT INTO profiles
					(communication, experience, expectations, people, knowledge, resources, specificity, corresponding_type)
				VALUES
					($1, $2, $3, $4, $5, $6, $7, $8),
					($9, $10, $11, $12, $13, $14, $15, $16)
				RETURNING id;
			`,
			[...primaryProfileValues, ...secondaryProfile],
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				const primaryId = db_res.rows[0].id;
				const secondaryId = db_res.rows[1].id;
				result(primaryId, secondaryId);
			}
		);
	}

	getProfilesCount(err: (error) => void, result: (count: any) => void): void {
		this.db.query(
			`	SELECT
					corresponding_type, COUNT(*) AS "count"
				FROM profiles
				GROUP BY corresponding_type;
			`,
			[],
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				let count = {};
				if (db_res.rows.length > 0) {
					db_res.rows.forEach((elem) => {
						count[elem.corresponding_type] = Number.parseInt(elem.count);
					});
				}
				result(count);
			}
		);
	}

	getPrimaryProfiles(
		err: (error) => void,
		result: (values: any) => void
	): void {
		this.db.query(
			`	SELECT primary_profile_id, communication, experience, expectations, people, knowledge, resources, specificity
				FROM results
				LEFT JOIN profiles
				ON results.primary_profile_id = profiles.id
			`,
			[],
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				result(db_res.rows);
			}
		);
	}

	getResultProfiles(
		primary_id: number,
		secondary_id: number,
		err: (error) => void,
		result: (values: any) => void
	): void {
		this.db.query(
			`SELECT * FROM profiles WHERE profiles.id IN ($1, $2)`,
			[primary_id, secondary_id],
			(error: any, db_res: any) => {
				if (error) {
					err(error);
					return;
				}
				result(db_res.rows);
			}
		);
	}
}
