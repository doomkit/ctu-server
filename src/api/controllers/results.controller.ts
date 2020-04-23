import { Router } from 'express';
import { db } from '../../db';

import * as Helpers from '../../utils/helpers';
import { ResultsRepository } from '../repositories';
import { Result } from 'src/models';

const resultsRepository = new ResultsRepository(db);

const ResultsRoute = Router();
export default (app: Router) => {
	ResultsRoute.get('/', (req, res, next) => {
		resultsRepository.getResults(
			(error) => {
				console.log(Helpers.now() + ' LOG: Get result ERROR');
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

	app.use('/results', ResultsRoute);
};
