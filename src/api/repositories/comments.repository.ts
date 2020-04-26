import { Comment } from '../../models';

export class CommentsRepository {
	constructor(private db: any) {}

	getComments(
		err: (error) => void,
		result: (comments: Comment[]) => void
	): void {
		this.db.query(`SELECT * FROM comments`, [], (error: any, db_res: any) => {
			if (error) {
				err(error);
				return;
			}
			result(db_res.rows);
		});
	}
}
