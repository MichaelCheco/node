import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
	},
});
userSchema.statics.findByLogin = async function(login) {
	let user = await this.findOne({
		username: login,
	});

	if (!user) {
		user = await this.findOne({ email: login });
	}

	return user;
};
userSchema.pre('remove', function(next) {
	this.model('Message').deleteMany({ user: this._id }, next);
});
const User = mongoose.model('User', userSchema);

export default User;

// PostgreSQL Implementation
// const user = (sequelize, DataTypes) => {
// 	const User = sequelize.define('user', {
// 		username: {
// 			type: DataTypes.STRING,
// 			unique: true,
// 		},
// 	});
// 	User.associate = models => {
// 		User.hasMany(models.Message, { onDelete: 'CASCADE' });
// 	};
// 	User.findByLogin = async login => {
// 		let user = await User.findOne({
// 			where: { username: login },
// 		});

// 		if (!user) {
// 			user = await User.findOne({
// 				where: { email: login },
// 			});
// 		}

// 		return user;
// 	};
// 	return User;
// };

// export default user;
