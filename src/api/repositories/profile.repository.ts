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
					(corresponding_type, communication, experience, expectations, people, knowledge, resources, specificity)
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
}
