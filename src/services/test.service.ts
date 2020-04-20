import { TestState } from '../models/test-state';
import { Question, Answer } from '../models';

export class TestService {
	nextState(state: TestState, questions: Question[]): TestState | null {
		if (!state.answers) {
			const question = questions.find((q: Question) => q.id === 1);
			if (question) {
				state.question = question;
			}
			return state;
		} else if (state.question && state.question.id && state.question.id < 20) {
			let nextId = state.question.id + 1;
			let loopCounter = 0;
			while (
				state.answers &&
				this.skipQuestion(nextId, state.answers) &&
				loopCounter < 50
			) {
				nextId++;
				loopCounter++;
			}
			let nextQuestion = questions.find((q: Question) => q.id === nextId);
			if (nextQuestion) {
				state.question = nextQuestion;
				return state;
			}
			return null;
		} else if (!state.specific_questions) {
			const { primary, secondary } = this.calculateSpecifications(
				state.answers
			);
			state.type_primary = primary;
			state.type_secondary = secondary;
			const specific_questions = questions.filter((q: Question) => {
				return (
					q.specification &&
					((q.specification as string).includes(primary) ||
						(q.specification as string).includes(secondary))
				);
			});
			state.specific_questions = specific_questions;
			state.question = state.specific_questions[0];
			return state;
		} else {
			let new_questions = state.specific_questions.filter(
				(q: Question) =>
					!state.answers.find((a: Answer) => a.question_id === q.id)
			);
			if (!new_questions || new_questions.length <= 0) {
				return this.calculateResult(state);
			} else {
				let loopCounter = 0;
				state.question = new_questions[0];
				while (
					loopCounter < 50 &&
					state.question &&
					state.question.id &&
					this.skipQuestion(state.question.id, state.answers)
				) {
					new_questions = state.specific_questions.filter(
						(q) => q.id === state.question.id
					);
					if (!new_questions || new_questions.length <= 0) {
						return this.calculateResult(state);
					}
					state.question = new_questions[0];
					loopCounter++;
				}
				return state;
			}
		}
		return null;
	}

	private calculateResult(state: TestState): TestState {
		console.log('CALCULATE RESULTS');
		state.end_time = new Date();
		return state;
	}

	private calculateSpecifications(
		answers: Answer[]
	): {
		primary: string;
		secondary: string;
	} {
		const profile = {
			education: 0,
			management: 0,
			'research projects': 0,
			'commercial projects': 0,
			'employee mobility': 0,
			'student mobility': 0,
			'short-term cooperation': 0,
		};

		answers.forEach((answer: Answer) => {
			switch (answer.question_id) {
				case 6: {
					switch (answer.letter) {
						case 'a': {
							profile.education++;
							profile['research projects']++;
							profile['commercial projects']++;
							break;
						}
						case 'b': {
							profile.education--;
							profile['research projects']--;
							profile['commercial projects']--;
							break;
						}
					}
					break;
				}
				case 7: {
					switch (answer.letter) {
						case 'a': {
							profile['research projects']++;
							profile['employee mobility']++;
							profile.management--;
							profile['short-term cooperation']--;
							break;
						}
						case 'b': {
							profile.education++;
							profile['research projects']++;
							profile['employee mobility']++;
							profile['student mobility']++;
							profile['short-term cooperation']--;
							break;
						}
						case 'c': {
							profile['student mobility']++;
							profile['short-term cooperation']++;
							profile.education--;
							profile['research projects']--;
							profile['commercial projects']--;
							profile['employee mobility']--;
							profile['student mobility']--;
							break;
						}
						case 'd': {
							profile['research projects']++;
							profile['commercial projects']++;
							profile['employee mobility']++;
							profile['student mobility']--;
							profile['short-term cooperation']--;
							break;
						}
						case 'e': {
							profile['employee mobility']++;
							profile['short-term cooperation']++;
							profile.education--;
							profile['commercial projects']--;
							profile['student mobility']--;
							break;
						}
						case 'f': {
							profile['student mobility']++;
							profile['short-term cooperation']++;
							profile['research projects']--;
							profile['employee mobility']--;
							break;
						}
						case 'g': {
							profile.education++;
							profile.management++;
							profile['employee mobility']--;
							profile['student mobility']--;
							break;
						}
					}
					break;
				}
				case 12: {
					switch (answer.letter) {
						case 'a': {
							profile.education++;
							profile.management++;
							profile['research projects']++;
							profile['commercial projects']++;
							break;
						}
						case 'b': {
							profile.education++;
							profile.management++;
							profile['research projects']++;
							profile['commercial projects']++;
							profile['employee mobility']++;
							profile['student mobility']++;
							profile['short-term cooperation']++;
							break;
						}
						case 'c': {
							profile.education++;
							profile['commercial projects']--;
							profile['student mobility']--;
							break;
						}
						case 'd': {
							profile.education--;
							profile.management--;
							profile['research projects']--;
							profile['commercial projects']--;
							profile['employee mobility']--;
							profile['student mobility']--;
							break;
						}
					}
					break;
				}
				case 13: {
					switch (answer.letter) {
						case 'a': {
							profile.education++;
							profile.management++;
							profile['employee mobility']++;
							profile['student mobility']++;
							profile['short-term cooperation']++;
							profile['commercial projects']--;
							break;
						}
						case 'b': {
							profile.education++;
							profile['research projects']++;
							profile['student mobility']--;
							profile['short-term cooperation']--;
							break;
						}
						case 'c': {
							profile.education--;
							profile.management--;
							profile['research projects']++;
							profile['commercial projects']++;
							profile['employee mobility']--;
							profile['student mobility']--;
							profile['short-term cooperation']--;
							break;
						}
					}
					break;
				}
				case 15: {
					switch (answer.letter) {
						case 'a': {
							profile.education++;
							profile.management++;
							profile['research projects']++;
							profile['commercial projects']++;
							profile['student mobility']--;
							profile['short-term cooperation']++;
							break;
						}
						case 'b': {
							profile.education--;
							profile['research projects']--;
							profile['short-term cooperation']--;
							break;
						}
						case 'c': {
							profile['research projects']++;
							profile['employee mobility']++;
							profile.education--;
							profile['short-term cooperation']--;
							break;
						}
					}
					break;
				}
				case 16: {
					switch (answer.letter) {
						case 'a': {
							profile.education++;
							profile.management++;
							profile['commercial projects']--;
							profile['student mobility']--;
							profile['short-term cooperation']--;
							break;
						}
						case 'b': {
							profile.management++;
							profile['research projects']++;
							profile['commercial projects']++;
							profile['employee mobility']++;
							profile.education--;
							profile['student mobility']--;
							break;
						}
						case 'c': {
							profile['student mobility']++;
							profile['short-term cooperation']++;
							profile.management--;
							profile['commercial projects']--;
							profile['employee mobility']--;
							break;
						}
						case 'd': {
							profile['short-term cooperation']++;
							profile.management--;
							profile['commercial projects']--;
							profile['student mobility']--;
							profile['employee mobility']--;
							break;
						}
					}
					break;
				}
				case 17: {
					switch (answer.letter) {
						case 'a': {
							profile.education++;
							profile['research projects']++;
							profile['commercial projects']++;
							profile['employee mobility']++;
							profile['short-term cooperation']++;
							profile['student mobility']--;
							break;
						}
						case 'b': {
							profile['research projects']++;
							profile['commercial projects']++;
							profile['short-term cooperation']--;
							break;
						}
						case 'c': {
							profile.education++;
							profile.management++;
							profile['research projects']++;
							profile['commercial projects']++;
							profile['employee mobility']++;
							profile['student mobility']++;
							profile['short-term cooperation']++;
							break;
						}
						case 'd': {
							profile.education++;
							profile.management++;
							profile['employee mobility']++;
							profile['student mobility']++;
							profile['short-term cooperation']++;
							profile['research projects']--;
							profile['commercial projects']--;
							break;
						}
					}
					break;
				}
				case 18: {
					switch (answer.letter) {
						case 'a': {
							profile.education++;
							profile['research projects']++;
							profile['commercial projects']++;
							profile['employee mobility']++;
							profile['student mobility']++;
							profile['short-term cooperation']++;
							break;
						}
						case 'b': {
							profile.management++;
							profile.education--;
							profile['commercial projects']--;
							profile['employee mobility']--;
							break;
						}
						case 'c': {
							profile.management++;
							profile['research projects']++;
							profile['employee mobility']++;
							profile['short-term cooperation']++;
							profile.education--;
							break;
						}
					}
					break;
				}
				case 19: {
					switch (answer.letter) {
						case 'a': {
							profile['short-term cooperation']++;
							profile.education--;
							profile.management--;
							profile['research projects']--;
							profile['commercial projects']--;
							profile['employee mobility']--;
							profile['student mobility']--;
							break;
						}
						case 'b': {
							profile['short-term cooperation']++;
							profile['research projects']++;
							profile['commercial projects']++;
							profile['employee mobility']++;
							profile['student mobility']++;
							profile.education--;
							profile.management--;
							break;
						}
						case 'c': {
							profile.management++;
							profile['research projects']++;
							profile['commercial projects']++;
							profile.education--;
							profile['short-term cooperation']--;
							break;
						}
						case 'd': {
							profile.education++, profile.management++;
							profile['research projects']++;
							profile['employee mobility']--;
							profile['student mobility']--;
							profile['short-term cooperation']--;
							break;
						}
					}
					break;
				}
			}
		});
		const primaryType = Object.keys(profile).reduce((a, b) =>
			profile[a] > profile[b] ? a : b
		);
		const secondaryType = Object.keys(profile)
			.filter((a) => a !== primaryType)
			.reduce((a, b) => (profile[a] > profile[b] ? a : b));
		return {
			primary: primaryType,
			secondary: secondaryType,
		};
	}

	private skipQuestion(questionId: number, answers: Answer[]): boolean {
		switch (questionId) {
			case 2:
			case 3:
			case 4:
			case 5: {
				const a = answers.find((a: Answer) => (a.question_id = 1));
				return !!a && a.letter !== 'a';
			}
			case 8:
			case 9: {
				const a = answers.find((a: Answer) => (a.question_id = 8));
				return !!a && a.letter !== 'a' && a.letter !== 'b';
			}
			case 24: {
				const a = answers.find((a: Answer) => (a.question_id = 23));
				return !!a && a.letter !== 'a';
			}
			case 27: {
				const a = answers.find((a: Answer) => (a.question_id = 26));
				return !!a && a.letter !== 'a';
			}
			case 30: {
				const a = answers.find((a: Answer) => (a.question_id = 29));
				return !!a && a.letter !== 'a' && a.letter !== 'b';
			}
			case 33:
			case 34: {
				const a = answers.find((a: Answer) => (a.question_id = 12));
				return !!a && a.letter !== 'a';
			}
			default: {
				return false;
			}
		}
	}
}
