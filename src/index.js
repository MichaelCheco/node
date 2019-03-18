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

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
	if (eraseDatabaseOnSync) {
		createUsersWithMessages();
	}

	app.listen(process.env.PORT, () =>
		console.log(`Example app listening on port ${process.env.PORT}!`)
	);
});
const createUsersWithMessages = async () => {
	await models.User.create(
		{
			username: 'rwieruch',
			messages: [
				{
					text: 'Published',
				},
			],
		},
		{
			include: [models.Message],
		}
	);
	await models.User.create(
		{
			username: 'ddavids',
			messages: [
				{
					text: 'Happy to release ...',
				},
				{
					text: 'Published a complete ...',
				},
			],
		},
		{
			include: [models.Message],
		}
	);
};
