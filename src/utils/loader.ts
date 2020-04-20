import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import history from 'connect-history-api-fallback';

import routes from '../api';

export const loadExpress = ({ app }: { app: express.Application }) => {
	app.use(cors());
	app.use(bodyParser.json());

	// Api routes
	app.use(process.env.API_PREFIX || '/api', routes());

	// Static content
	app.use(express.static(process.cwd() + '/public'));
	app.use(history({ index: 'public/index.html' }));
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(process.cwd() + '/public/', 'index.html'));
	});
};
