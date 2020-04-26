import { Router } from 'express';
import { db } from '../../db';

import * as Helpers from '../../utils/helpers';
import { ResultsRepository, ProfileRepository } from '../repositories';
import { Result } from 'src/models';

const resultsRepository = new ResultsRepository(db);
const profileRepository = new ProfileRepository(db);

const ResultsRoute = Router();
export default (app: Router) => {
	ResultsRoute.get('/', (req, res, next) => {
		resultsRepository.getResults(
			(error) => {
				console.log(Helpers.now() + ' LOG: Get results ERROR');
				return next(error);
			},
			(results: Result[]) => res.send(results)
		);
	});

	ResultsRoute.delete('/:id', (req, res, next) => {
		resultsRepository.deleteResult(
			parseInt(req.params.id),
			(error) => {
				console.log(Helpers.now() + ' LOG: Delete result ERROR');
				return next(error);
			},
			(result) => res.send(result)
		);
	});

	ResultsRoute.get('/:id', (req, res, next) => {
		resultsRepository.getResult(
			req.params.id,
			(error) => {
				console.log(Helpers.now() + ' LOG: Get result ERROR');
				return next(error);
			},
			(result) => {
				if (!result.primary_profile_id || !result.secondary_profile_id) {
					return res.status(500).send({ error: 'Result calculation' });
				}
				profileRepository.getResultProfiles(
					result.primary_profile_id,
					result.secondary_profile_id,
					(error) => {
						console.log(Helpers.now() + ' LOG: Get result ERROR');
						return next(error);
					},
					(profiles) => {
						result.primary_profile = profiles.find(
							(profile) => profile.id === result.primary_profile_id
						);
						result.secondary_profile = profiles.find(
							(profile) => profile.id === result.secondary_profile_id
						);
						console.log(result);
						res.send(result);
					}
				);
			}
		);
	});

	app.use('/results', ResultsRoute);
};
