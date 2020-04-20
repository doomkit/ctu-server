import { Profile } from './profile';

export interface Result {
	id?: number;
	start_date: number | Date;
	complete_date: number | Date;
	primary_profile_id: Profile;
	secondary_profile_id: Profile;
}
