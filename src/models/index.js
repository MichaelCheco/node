import mongoose from 'mongoose';

import User from './user';
import Message from './message';

const connectDb = () => {
	return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Message };

export { connectDb };

export default models;

/* PostgreSQL Implementation
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
	process.env.DATABASE,
	process.env.DATABASE_USER,
	process.env.DATABASE_PASSWORD,
	{
		dialect: 'postgres',
	}
);

const models = {
	User: sequelize.import('./user'),
	Message: sequelize.import('./message'),
};

Object.keys(models).forEach(key => {
	if ('associate' in models[key]) {
		models[key].associate(models);
	}
});

export { sequelize };

export default models;
*/
