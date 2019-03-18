import 'dotenv/config';
import express from 'express';
import cors from 'cors';
let users = {
	1: {
		id: '1',
		username: 'Robin Wieruch',
	},
	2: {
		id: '2',
		username: 'Dave Davids',
	},
};

let messages = {
	1: {
		id: '1',
		text: 'Hello World',
		userId: '1',
	},
	2: {
		id: '2',
		text: 'By World',
		userId: '2',
	},
};
const app = express();
app.use(cors());
app.get('/users', (req, res) => {
	return res.send(Object.values(users));
});
app.get('/users/:userId', (req, res) => {
	const { userId } = req.params;
	return res.send(users[userId]);
});
app.get('/messages', (req, res) => {
	return res.send(Object.values(messages));
});

app.get('/messages/:messageId', (req, res) => {
	return res.send(messages[req.params.messageId]);
});
app.post('/users', (req, res) => {
	return res.send('POST HTTP method on user resource');
});

app.put('/users/:userId', (req, res) => {
	return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete('/users/:userId', (req, res) => {
	return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.listen(3000, () =>
	console.log(`Example app listening on port ${process.env.PORT}!`)
);
