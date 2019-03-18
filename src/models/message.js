import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;

// PostgreSQL Implementation
// const message = (sequelize, DataTypes) => {
// 	const Message = sequelize.define('message', {
// 		text: DataTypes.STRING,
// 	});

// 	Message.associate = models => {
// 		Message.belongsTo(models.User);
// 	};

// 	return Message;
// };

// export default message;
