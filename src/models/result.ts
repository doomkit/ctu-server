import { Profile } from './profile';
import { Answer } from './answer';

export interface Result {
	id?: number;
	str_id?: string;
	start_date: number | Date;
	complete_date: number | Date;
	primary_profile: Profile;
	secondary_profile: Profile;
	answers: Answer[];
	primary_profile_id?: number;
	secondary_profile_id?: number;
}

export interface ResultAnswer {
	id: number;
	answer_id: number;
	result_id: number;
}
