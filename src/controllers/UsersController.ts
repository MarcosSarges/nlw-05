import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

class UsersController {
	_instance: UsersController;

	constructor() {
		if (this._instance === null) this._instance = new UsersController();
		return this._instance;
	}

	static GetInstance() {
		return new UsersController();
	}

	async create(req: Request, res: Response) {
		try {
			const { email } = req.body;
			const user = await UsersService.GetInstance().create({
				email,
			});

			return res.json(user);
		} catch (error) {
			res.status(500);
			return res.json({ error: error.message });
		}
	}
}
export default UsersController;
