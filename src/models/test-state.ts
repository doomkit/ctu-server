import { Question } from './question';
import { Answer } from './answer';

export interface TestState {
	answers: Answer[];
	question: Question;
	type_primary?: string;
	type_secondary?: string;
	specific_questions?: any[];
	start_time?: number | Date;
	end_time?: number | Date;
}
