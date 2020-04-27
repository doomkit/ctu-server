export interface Answer {
	id?: number;
	letter?: string;
	question_id: number;
	answer_id?: number;
	content_en: string;
	content_cz: string;
	params: string;
}
