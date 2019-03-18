import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { sequelize } from './models';
import routes from './routes';

const app = express();
app.use((req, res, next) => {
	req.context = {
		models,
		me: models.users[1],
	};
	next();
});
app.use(cors());
app.use(express.json());
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

const eraseDatabaseOnSync = true;

sequelize.sync().then(() => {
	app.listen(process.env.PORT, () => {
		console.log(`Example app listening on port ${process.env.PORT}`);
	});
});
