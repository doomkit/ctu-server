export interface Comment {
	id: number;
	content_en: string;
	content_cz: string;
	condition: CommentType;
	comment_type: string;
}

export type CommentType = 'Danger' | 'Warning' | 'Info';
