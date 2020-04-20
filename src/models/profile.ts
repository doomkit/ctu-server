import { CollaborationType } from './collaboration';

export interface Profile {
	id?: number;
	corresponding_type?: CollaborationType;
	communication: number;
	experience: number;
	expectations: number;
	people: number;
	knowledge: number;
	resources: number;
	specificity: number;
}

export class ProfileStats implements Profile {
	communication = 0;
	experience = 0;
	expectations = 0;
	people = 0;
	knowledge = 0;
	resources = 0;
	specificity = 0;
}
