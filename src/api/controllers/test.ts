import { Router } from 'express';
import { db } from '../../db';
import { TestService } from '../../services/test.service';
import { Question } from '../../models';
import * as Helpers from '../../utils/helpers';
import {
	QuestionsRepository,
	ProfileRepository,
	ResultsRepository,
	AnswersRepository,
} from '../repositories';

const TestRoute = Router();

const testService = new TestService();
const questionRepository = new QuestionsRepository(db);
const profileRepository = new ProfileRepository(db);
const resultsRepository = new ResultsRepository(db);
const answersRepository = new AnswersRepository(db);

export default (app: Router) => {
	TestRoute.post('/', (req, res, next) => {
		questionRepository.getQuestions(
			(error) => {
				console.log(Helpers.now() + ' LOG: Get next test state ERROR');
				return next(error);
			},
			(questions: Question[]) => {
				const newState = testService.nextState(req.body, questions);
				if (newState === null) {
					return res.status(500).send({ error: 'Invalid state' });
				}

				if (newState.end_time) {
					// Test was finished
					const result = testService.calculateResult(newState);
					if (result === null) {
						return res.status(500).send({ error: 'Invalid result' });
					}
					profileRepository.createProfile(
						// Persist profiles
						result.primary_profile,
						result.secondary_profile,
						(error) => {
							console.log(Helpers.now() + ' LOG: Create profiles ERROR');
							return next(error);
						},
						(primaryId, secondaryId) => {
							// Create result with linked profiles
							resultsRepository.createResult(
								newState.start_time as Date,
								newState.end_time as Date,
								primaryId,
								secondaryId,
								(error) => {
									console.log(Helpers.now() + ' LOG: Create result ERROR');
									return next(error);
								},
								(resultId, stringId) => {
									// Save user answers
									newState.result_str_id = stringId;
									answersRepository.saveAnswers(
										newState.answers,
										resultId,
										(error) => {
											console.log(Helpers.now() + ' LOG: Save answers ERROR');
											next(error);
										},
										() => {
											res.send(newState);
										}
									);
								}
							);
						}
					);
				} else {
					// Send next question
					res.send(newState);
				}
			}
		);
	});

	app.use('/test', TestRoute);
};
