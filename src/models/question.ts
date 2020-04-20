import { Answer, CollaborationType } from '../models';

export interface Question {
	id?: number;
	is_common: boolean;
	specification?: CollaborationType | string;
	content_en: string;
	content_cz: string;
	answers?: Answer[];
}
