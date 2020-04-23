import { Router } from 'express';
import { db } from '../../db';
import { Question } from '../../models';
import * as Helpers from '../../utils/helpers';
import { QuestionsRepository } from '../repositories';

const questionRepository = new QuestionsRepository(db);

const QuestionsRoute = Router();
export default (app: Router) => {
	QuestionsRoute.get('/', (req, res, next) => {
		questionRepository.getQuestions(
			(error) => {
				console.log(Helpers.now() + ' LOG: Get questions ERROR');
				return next(error);
			},
			(questions: Question[]) => {
				res.send(questions);
			}
		);
	});

	QuestionsRoute.get('/:id', (req, res, next) => {
		questionRepository.getQuestionById(
			parseInt(req.params.id),
			(error) => {
				console.log(Helpers.now() + ' LOG: Get question ERROR');
				return next(error);
			},
			(question: Question) => res.send(question)
		);
	});

	app.use('/questions', QuestionsRoute);
};
