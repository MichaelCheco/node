import 'dotenv/config';
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.get('/users', (req, res) => {
	return res.send('GET HTTP method on user resource');
});

app.post('/users', (req, res) => {
	return res.send('POST HTTP method on user resource');
});

app.put('/users', (req, res) => {
	return res.send('PUT HTTP method on user resource');
});

app.delete('/users', (req, res) => {
	return res.send('DELETE HTTP method on user resource');
});

app.listen(3000, () =>
	console.log(`Example app listening on port ${process.env.PORT}!`)
);
