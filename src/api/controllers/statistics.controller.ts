import { Router } from 'express';
import { db } from '../../db';
import * as Helpers from '../../utils/helpers';
import { StatisticService } from '../../services';
import { ProfileRepository, ResultsRepository } from '../repositories';
import { ProfileStats } from 'src/models';

const StatisticsRoute = Router();
const statisticsService = new StatisticService();
const profileRepository = new ProfileRepository(db);
const resultsRepository = new ResultsRepository(db);

export default (app: Router) => {
	StatisticsRoute.get('/avg-time-spent', (req, res, next) => {
		resultsRepository.getDurations(
			(error) => {
				console.log(Helpers.now() + ' LOG: Get duration ERROR');
				return next(error);
			},
			(data) => {
				let avg_duration = statisticsService.calculateAvgDuration(data);
				let last_completion =
					data
						.map((a: any) => a.complete_date)
						.sort((a: any, b: any) => b.getTime() - a.getTime())[0] || null;
				console.log(Helpers.now() + ' LOG: Get duration OK');
				res.send({
					avg_duration,
					total: data.rows.length,
					last_completion,
				});
			}
		);
	});

	StatisticsRoute.get('/avg-profile', (req, res, next) => {
		profileRepository.getPrimaryProfiles(
			(error) => {
				console.log(Helpers.now() + ' LOG: Get profiles ERROR');
				return next(error);
			},
			(profiles: ProfileStats[]) => {
				res.send(statisticsService.calculateAvgProfile(profiles));
			}
		);
	});

	StatisticsRoute.get('/type-count', (req, res, next) => {
		profileRepository.getProfilesCount(
			(error) => {
				console.log(Helpers.now() + ' LOG: Get profiles count ERROR');
				return next(error);
			},
			(count) => res.send(count)
		);
	});

	app.use('/statistics', StatisticsRoute);
};
