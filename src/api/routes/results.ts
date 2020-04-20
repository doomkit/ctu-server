import { Router } from 'express';
import { db } from '../../db';
import { Profile } from '../../models/profile';

const ResultsRoute = Router();
export default (app: Router) => {
	ResultsRoute.get('/', (req, res, next) => {
		db.query(`SELECT * FROM results;`, [], (err: any, db_res: any) => {
			if (err) {
				console.log(new Date().toLocaleString() + ' LOG: Get results ERROR');
				return next(err);
			}
			console.log(new Date().toLocaleString() + ' LOG: Get results OK');
			res.send(db_res.rows);
		});
	});

	ResultsRoute.post('/', (req, res, next) => {
		const startDate = req.body.startDate;
		const endDate = req.body.endDate;
		const primaryProfileValues: (number | string)[] = Object.values(
			req.body.primaryProfile as Profile
		);
		const secondaryProfile: (number | string)[] = Object.values(
			req.body.secondaryProfile as Profile
		);
		db.query(
			`INSERT INTO profiles
					(corresponding_type, communication, experience, expectations, people, knowledge, resources, specificity)
				VALUES
					($1, $2, $3, $4, $5, $6, $7, $8),
					($9, $10, $11, $12, $13, $14, $15, $16)
				RETURNING id;
			`,
			[...primaryProfileValues, ...secondaryProfile],
			(err: any, db_res: any) => {
				if (err) {
					console.log(
						new Date().toLocaleString() + ' LOG: Create profiles ERROR'
					);
					return next(err);
				}
				console.log(new Date().toLocaleString() + ' LOG: Create profiles OK');
				const primaryId = db_res.rows[0].id;
				const secondaryId = db_res.rows[1].id;
				db.query(
					`	INSERT INTO results
							(start_date, complete_date, primary_profile_id, secondary_profile_id)
						VALUES
							(to_timestamp($1), to_timestamp($2), $3, $4)
						RETURNING *;
			`,
					[startDate, endDate, primaryId, secondaryId],
					(err: any, db_res2: any) => {
						if (err) {
							console.log(
								new Date().toLocaleString() + ' LOG: Create result ERROR'
							);
							return next(err);
						}
						console.log(new Date().toLocaleString() + ' LOG: Create result OK');
						res.send(db_res2.rows);
					}
				);
			}
		);
	});

	ResultsRoute.delete('/:id', (req, res, next) => {
		db.query(
			`	DELETE FROM results WHERE id = $1 RETURNING *;`,
			[req.params.id],
			(err: any, db_res: any) => {
				if (err) {
					console.log(new Date().toLocaleString() + ' LOG: Read result ERROR');
					return next(err);
				}
				console.log(new Date().toLocaleString() + ' LOG: Read result OK');
				const primaryId = db_res.rows[0].primary_profile_id;
				const secondaryId = db_res.rows[0].secondary_profile_id;
				db.query(
					`DELETE FROM profiles WHERE id IN ($1, $2);`,
					[primaryId, secondaryId],
					(err: any, db_res2: any) => {
						if (err) {
							console.log(
								new Date().toLocaleString() + ' LOG: Delete result ERROR'
							);
							return next(err);
						}
						console.log(new Date().toLocaleString() + ' LOG: Delete result OK');
						res.send(db_res2.rows[0]);
					}
				);
			}
		);
	});

	app.use('/results', ResultsRoute);
};
