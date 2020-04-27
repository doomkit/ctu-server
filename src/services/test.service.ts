import {
	TestState,
	ProfileStats,
	Result,
	Question,
	Answer,
	CollaborationType,
} from '../models';

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
				state.end_time = new Date();
				return state;
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
						state.end_time = new Date();
						return state;
					}
					state.question = new_questions[0];
					loopCounter++;
				}
				return state;
			}
		}
		return null;
	}

	calculateResult(state: TestState): Result | null {
		const primary_profile = new ProfileStats();
		const secondary_profile = new ProfileStats();
		if (!state.type_primary || !state.type_secondary) {
			return null;
		}
		primary_profile.corresponding_type = state.type_primary;
		secondary_profile.corresponding_type = state.type_secondary;
		for (let i = 0; i < state.answers.length; i++) {
			const params = state.answers[i].params
				? JSON.parse(state.answers[i].params)
				: {};
			for (let type in params) {
				if (primary_profile.corresponding_type === type) {
					for (let key in params[type]) {
						primary_profile[key] = primary_profile[key] + params[type][key];
					}
				}
				if (secondary_profile.corresponding_type === type) {
					for (let key in params[type]) {
						secondary_profile[key] = secondary_profile[key] + params[type][key];
					}
				}
			}
		}
		for (let key in primary_profile) {
			if (key !== 'corresponding_type') {
				primary_profile[key] = Math.round(primary_profile[key] * 2) / 10;
			}
		}
		for (let key in secondary_profile) {
			if (key !== 'corresponding_type') {
				secondary_profile[key] = Math.round(secondary_profile[key] * 2) / 10;
			}
		}
		const result: Result = {
			start_date: state.start_time ? state.start_time : new Date(),
			complete_date: state.end_time ? state.end_time : new Date(),
			primary_profile,
			secondary_profile,
			answers: state.answers,
		};
		return result;
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
							profile.management++;
							profile['research projects']++;
							profile['employee mobility']++;
							profile['student mobility']--;
							profile['short-term cooperation']--;
							break;
						}
						case 'b': {
							profile.education++;
							profile.management = profile.management + 2;
							profile['research projects']++;
							profile['employee mobility'] = profile['employee mobility'] + 2;
							profile['student mobility']--;
							profile['short-term cooperation']--;
							break;
						}
						case 'c': {
							profile.education = profile.education - 2;
							profile['research projects']--;
							profile['commercial projects']--;
							profile['employee mobility']--;
							profile['student mobility'] = profile['student mobility'] + 2;
							profile['short-term cooperation'] =
								profile['short-term cooperation'] + 5;
							break;
						}
						case 'd': {
							profile['research projects'] = profile['research projects'] + 5;
							profile['commercial projects'] =
								profile['commercial projects'] + 6;
							profile['employee mobility']++;
							profile['student mobility'] = profile['student mobility'] - 2;
							profile['short-term cooperation'] =
								profile['short-term cooperation'] - 2;
							break;
						}
						case 'e': {
							profile.education = profile.education - 2;
							profile.management = profile.management + 3;
							profile['employee mobility'] = profile['employee mobility'] + 3;
							profile['student mobility'] = profile['student mobility'] - 2;
							break;
						}
						case 'f': {
							profile['research projects'] = profile['research projects'] - 2;
							profile['employee mobility'] = profile['employee mobility'] - 2;
							profile['student mobility'] = profile['student mobility'] + 5;
							profile['short-term cooperation'] =
								profile['short-term cooperation'] + 5;
							break;
						}
						case 'g': {
							profile.education = profile.education + 3;
							profile.management = profile.management + 2;
							profile['research projects']--;
							profile['commercial projects']--;
							profile['employee mobility']--;
							break;
						}
					}
					break;
				}
				case 12: {
					switch (answer.letter) {
						case 'a': {
							profile.management = profile.management + 5;
							profile['research projects'] = profile['research projects'] + 2;
							break;
						}
						case 'c': {
							profile.education++;
							profile['commercial projects']--;
							profile['student mobility']--;
							break;
						}
						case 'd': {
							profile.education = profile.education + 2;
							profile.management--;
							profile['research projects'] = profile['research projects'] + 2;
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
							profile['short-term cooperation']++;
							break;
						}
						case 'b': {
							profile.education++;
							break;
						}
						case 'c': {
							profile.education--;
							profile.management--;
							profile['employee mobility']--;
							profile['short-term cooperation']--;
							break;
						}
					}
					break;
				}
				case 15: {
					switch (answer.letter) {
						case 'a': {
							profile.education = profile.education + 2;
							profile['research projects']++;
							break;
						}
						case 'b': {
							profile.education = profile.education - 2;
							profile['research projects'] = profile['research projects'] - 2;
							profile['student mobility']--;
							profile['short-term cooperation']--;
							break;
						}
						case 'c': {
							profile.education = profile.education - 2;
							profile.management++;
							profile['research projects']--;
							profile['commercial projects']++;
							profile['employee mobility'] = profile['employee mobility'] + 2;
							profile['short-term cooperation']--;
							break;
						}
					}
					break;
				}
				case 16: {
					switch (answer.letter) {
						case 'a': {
							profile.education = profile.education + 3;
							profile.management++;
							profile['research projects']--;
							profile['employee mobility']++;
							profile['student mobility'] = profile['student mobility'] - 2;
							break;
						}
						case 'b': {
							profile.education--;
							profile.management++;
							profile['research projects'] = profile['research projects'] + 3;
							profile['employee mobility']++;
							profile['student mobility'] = profile['student mobility'] - 2;
							break;
						}
						case 'c': {
							profile.management--;
							profile['research projects']--;
							profile['employee mobility'] = profile['employee mobility'] - 2;
							profile['student mobility'] = profile['student mobility'] + 3;
							break;
						}
						case 'd': {
							profile.management--;
							profile['research projects'] = profile['research projects'] - 2;
							profile['employee mobility'] = profile['employee mobility'] - 2;
							profile['student mobility']--;
							break;
						}
					}
					break;
				}
				case 17: {
					switch (answer.letter) {
						case 'a': {
							profile.education = profile.education + 3;
							profile['employee mobility']++;
							profile['short-term cooperation']++;
							break;
						}
						case 'b': {
							profile.education = profile.education - 2;
							profile['student mobility'] = profile['student mobility'] + 2;
							profile['short-term cooperation']--;
							break;
						}
						case 'c': {
							profile.education = profile.education + 3;
							profile.management++;
							profile['research projects']++;
							profile['commercial projects']++;
							profile['employee mobility']++;
							profile['student mobility']++;
							profile['short-term cooperation'] =
								profile['short-term cooperation'] + 2;
							break;
						}
						case 'd': {
							profile.education = profile.education - 2;
							profile.management = profile.management - 2;
							profile['employee mobility'] = profile['employee mobility'] - 2;
							profile['student mobility'] = profile['student mobility'] - 2;
							profile['short-term cooperation'] =
								profile['short-term cooperation'] - 2;
							break;
						}
					}
					break;
				}
				case 18: {
					switch (answer.letter) {
						case 'a': {
							profile.education = profile.education + 3;
							profile.management++;
							profile['research projects'] = profile['research projects'] + 2;
							profile['commercial projects']++;
							profile['employee mobility']++;
							profile['student mobility']++;
							profile['short-term cooperation']++;
							break;
						}
						case 'b': {
							profile.education = profile.education - 2;
							profile['research projects']--;
							profile['employee mobility']--;
							profile['student mobility']--;
							profile['short-term cooperation']--;
							break;
						}
						case 'c': {
							profile.management++;
							profile['commercial projects']++;
							profile['employee mobility']++;
							profile['short-term cooperation'] =
								profile['short-term cooperation'] + 2;
							break;
						}
					}
					break;
				}
				case 19: {
					switch (answer.letter) {
						case 'a': {
							profile.education = profile.education - 5;
							profile.management = profile.management - 2;
							profile['research projects'] = profile['research projects'] - 3;
							profile['commercial projects'] =
								profile['commercial projects'] - 3;
							profile['employee mobility']--;
							profile['student mobility']--;
							profile['short-term cooperation'] =
								profile['short-term cooperation'] + 3;
							break;
						}
						case 'b': {
							profile.education = profile.education - 4;
							profile.management = profile.management - 2;
							profile['short-term cooperation'] =
								profile['short-term cooperation'] + 2;
							break;
						}
						case 'c': {
							profile.education = profile.education - 2;
							profile.management++;
							profile['research projects']++;
							profile['commercial projects']++;
							profile['employee mobility'] = profile['employee mobility'] + 2;
							profile['student mobility'] = profile['student mobility'] + 2;
							profile['short-term cooperation']--;
							break;
						}
						case 'd': {
							profile.education = profile.education + 2;
							profile.management = profile.management + 2;
							profile['research projects'] = profile['research projects'] + 2;
							profile['commercial projects'] =
								profile['commercial projects'] + 2;
							profile['employee mobility']++;
							profile['student mobility']++;
							profile['short-term cooperation'] =
								profile['short-term cooperation'] - 4;
							break;
						}
						case 'e': {
							profile.education = profile.education + 3;
							profile.management = profile.management + 3;
							profile['research projects'] = profile['research projects'] + 2;
							profile['commercial projects'] =
								profile['commercial projects'] + 2;
							profile['short-term cooperation'] =
								profile['short-term cooperation'] - 5;
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
				return !!a && a.letter === 'c';
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
