import { Router } from 'express';
import { db } from '../../db';
import { Answer } from '../../models';
import { AnswersRepository } from '../repositories';
import * as Helpers from '../../utils/helpers';

const answersRepository = new AnswersRepository(db);

const AnswersRoute = Router();
export default (app: Router) => {
	AnswersRoute.post('/', (req, res, next) => {
		const answer = req.body as Answer;
		answersRepository.createAnswer(
			answer,
			(error) => {
				console.log(Helpers.now() + ' LOG: Create answer ERROR');
				return next(error);
			},
			(answer: Answer) => res.send(answer)
		);
	});

	AnswersRoute.delete('/:id', (req, res, next) => {
		answersRepository.deleteAnswer(
			parseInt(req.params.id),
			(error) => {
				console.log(Helpers.now() + ' LOG: Delete answer ERROR');
				return next(error);
			},
			(answer: Answer) => res.send(answer)
		);
	});

	app.use('/answers', AnswersRoute);
};
