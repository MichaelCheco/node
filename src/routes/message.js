import uuidv4 from 'uuid/v4';
import { Router } from 'express';

const router = Router();
// MongoDB
router.get('/', async (req, res) => {
	const messages = await req.context.models.Message.find();
	return res.send(messages);
});
// PostgreSQL
// router.get('/', async (req, res) => {
// 	const messages = await req.context.models.Message.findAll();
// 	return res.send(messages);
// });

router.get('/:messageId', async (req, res) => {
	const message = await req.context.models.Message.findById(
		req.params.messageId
	);
	return res.send(message);
});

router.post('/', async (req, res) => {
	const message = await req.context.models.Message.create({
		text: req.body.text,
		userId: req.context.me.id,
	});

	return res.send(message);
});
// MongoDB
router.delete('/:messageId', async (req, res) => {
	const message = await req.context.models.Message.findById(
		req.params.messageId
	);

	let result = null;
	if (message) {
		result = await message.remove();
	}

	return res.send(result);
});

// PostgreSQL
// router.delete('/:messageId', async (req, res) => {
// 	const result = await req.context.models.Message.destroy({
// 		where: { id: req.params.messageId },
// 	});

// 	return res.send(true);
// });

export default router;
