import { Router } from 'express';
import { db } from '../../db';

import * as Helpers from '../../utils/helpers';
import {
	ResultsRepository,
	ProfileRepository,
	CommentsRepository,
	AnswersRepository,
} from '../repositories';
import { Result, Comment } from '../../models';

const resultsRepository = new ResultsRepository(db);
const profileRepository = new ProfileRepository(db);
const commentsRepository = new CommentsRepository(db);
const answersRepository = new AnswersRepository(db);

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
				if (
					!result ||
					!result.primary_profile_id ||
					!result.secondary_profile_id
				) {
					return res.status(404).send({ error: 'Result calculation' });
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
						commentsRepository.getComments(
							(error) => {
								console.log(Helpers.now() + ' LOG: Get comments ERROR');
								return next(error);
							},
							(comments) => {
								answersRepository.getAnswers(
									(result.id as number).toString(),
									(error) => {
										console.log(Helpers.now() + ' LOG: Get answers ERROR');
										return next(error);
									},
									(answers) => {
										const answers_ids = answers.map((answer) => answer.id);
										let filtered_comments: Comment[] = [];
										comments.forEach((comment) => {
											let conditions: (number | string)[] = JSON.parse(
												comment.condition
											);
											for (let i = 0; i < conditions.length; i++) {
												let condition = conditions[i];
												const presented = answers_ids.find(
													(answer_id) => answer_id === condition
												);
												const typeMatch =
													result.primary_profile.corresponding_type ===
														condition ||
													result.secondary_profile.corresponding_type ===
														condition;
												if (presented || typeMatch) {
													filtered_comments = [...filtered_comments, comment];
													break;
												}
											}
										});
										result.comments = filtered_comments;
										result.answers = answers;
										res.send(result);
									}
								);
							}
						);
					}
				);
			}
		);
	});

	app.use('/results', ResultsRoute);
};
