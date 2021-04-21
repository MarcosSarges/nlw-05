import { Request, Response } from 'express';
import MessagesService from '../services/MessagesService';

class MessageController {
	_instance: MessageController;

	constructor() {
		if (this._instance === null) this._instance = new MessageController();
		return this._instance;
	}

	static GetInstance() {
		return new MessageController();
	}

	async create(req: Request, res: Response) {
		try {
			const { text, user_id, admin_id } = req.body;
			const message = await MessagesService.GetInstance().create({
				text,
				user_id,
				admin_id,
			});

			return res.json(message);
		} catch (error) {
			res.status(500);
			return res.json({ error: error.message });
		}
	}
	async showByUser(req: Request, res: Response) {
		try {
			const { user_id } = req.params;
			const messages = await MessagesService.GetInstance().listByUser(user_id);

			return res.json(messages);
		} catch (error) {
			res.status(500);
			return res.json({ error: error.message });
		}
	}
}
export default MessageController;
