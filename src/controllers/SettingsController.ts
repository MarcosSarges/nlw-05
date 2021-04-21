import { Request, Response } from 'express';
import SettingsService from '../services/SettingsService';

class SettingsController {
	_instance: SettingsController;

	constructor() {
		if (this._instance === null) this._instance = new SettingsController();
		return this._instance;
	}

	static GetInstance() {
		return new SettingsController();
	}

	async create(req: Request, res: Response) {
		try {
			const { chat, username } = req.body;
			const setting = await SettingsService.GetInstance().create({
				chat,
				username,
			});

			return res.json(setting);
		} catch (error) {
			res.status(500);
			return res.json({ error: error.message });
		}
	}
}
export default SettingsController;
