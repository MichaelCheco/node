import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// import models, { sequelize } from './models';
import models, { connectDb } from './models';
import routes from './routes';

const app = express();
app.use(async (req, res, next) => {
	req.context = {
		models,
		me: await models.User.findByLogin('rwieruch'),
	};
	next();
});
app.use(cors());
app.use(express.json());
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
	if (eraseDatabaseOnSync) {
		await Promise.all([
			models.User.deleteMany({}),
			models.Message.deleteMany({}),
		]);
	}
	createUsersWithMessages();

	app.listen(process.env.PORT, () =>
		console.log(`Example app listening on port ${process.env.PORT}!`)
	);
});
const createUsersWithMessages = async () => {
	const user1 = new models.User({
		username: 'rwieruch',
	});
	const user2 = new models.User({
		username: 'ddavids',
	});

	const message1 = new models.Message({
		text: 'Published',
		user: user1.id,
	});
	const message2 = new models.Message({
		text: 'Happy to release ...',
		user: user2.id,
	});

	const message3 = new models.Message({
		text: 'Published a complete ...',
		user: user2.id,
	});
	await message1.save();
	await message2.save();
	await message3.save();
	await user1.save();
	await user2.save();
};

// const eraseDatabaseOnSync = true;

// sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
// 	if (eraseDatabaseOnSync) {
// 		createUsersWithMessages();
// 	}

// 	app.listen(process.env.PORT, () =>
// 		console.log(`Example app listening on port ${process.env.PORT}!`)
// 	);
// });
// const createUsersWithMessages = async () => {
// 	await models.User.create(
// 		{
// 			username: 'rwieruch',
// 			messages: [
// 				{
// 					text: 'Published',
// 				},
// 			],
// 		},
// 		{
// 			include: [models.Message],
// 		}
// 	);
// 	await models.User.create(
// 		{
// 			username: 'ddavids',
// 			messages: [
// 				{
// 					text: 'Happy to release ...',
// 				},
// 				{
// 					text: 'Published a complete ...',
// 				},
// 			],
// 		},
// 		{
// 			include: [models.Message],
// 		}
// 	);
// };
