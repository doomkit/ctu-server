import { Router } from 'express';
import { db } from '../../db';
import { StatisticService } from '../../services';

const StatisticsRoute = Router();
const statisticsService = new StatisticService();

export default (app: Router) => {
	StatisticsRoute.get('/avg-time-spent', (req, res, next) => {
		db.query(
			`SELECT start_date, complete_date FROM results`,
			[],
			(err: any, db_res: any) => {
				const now = new Date().toLocaleString();
				if (err) {
					console.log(now + ' LOG: Get duration ERROR');
					return next(err);
				}
				let avg_duration = statisticsService.calculateAvgDuration(db_res.rows);
				let last_completion =
					db_res.rows
						.map((a: any) => a.complete_date)
						.sort((a: any, b: any) => b.getTime() - a.getTime())[0] || null;
				console.log(now + ' LOG: Get duration OK');
				res.send({
					avg_duration,
					total: db_res.rows.length,
					last_completion,
				});
			}
		);
	});

	StatisticsRoute.get('/avg-profile', (req, res, next) => {
		db.query(
			`	SELECT
					communication, experience, expectations, people, knowledge, resources, specificity
				FROM profiles`,
			[],
			(err: any, db_res: any) => {
				const now = new Date().toLocaleString();
				if (err) {
					console.log(now + ' LOG: Get profiles ERROR');
					return next(err);
				}
				console.log(now + ' LOG: Get profiles OK');
				let avg_profile = statisticsService.calculateAvgProfile(db_res.rows);
				res.send(avg_profile);
			}
		);
	});

	StatisticsRoute.get('/type-count', (req, res, next) => {
		db.query(
			`	SELECT
					corresponding_type, COUNT(*) AS "count"
				FROM profiles
				GROUP BY corresponding_type;
			`,
			[],
			(err: any, db_res: any) => {
				const now = new Date().toLocaleString();
				if (err) {
					console.log(now + ' LOG: Get profiles ERROR');
					return next(err);
				}
				let result = {};
				if (db_res.rows.length > 0) {
					db_res.rows.forEach((elem) => {
						result[elem.corresponding_type] = Number.parseInt(elem.count);
					});
				}
				console.log(now + ' LOG: Get profiles OK');
				res.send(result);
			}
		);
	});

	app.use('/statistics', StatisticsRoute);
};
