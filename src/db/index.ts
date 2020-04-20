import { Pool } from 'pg';

const pool = new Pool();
export const db = {
	query: (text: any, params: any, callback: any) => {
		return pool.query(text, params, callback);
	}
};
