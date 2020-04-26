import { Profile, Answer, Comment } from '.';

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
	comments?: Comment[];
}

export interface ResultAnswer {
	id: number;
	answer_id: number;
	result_id: number;
}
