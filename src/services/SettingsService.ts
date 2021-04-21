import { getCustomRepository } from 'typeorm';
import Setting from '../entities/Setting';
import SettingsRepository from '../repositories/SettingsRepository';

interface ISettingsCreate {
	chat: boolean;
	username: string;
}

class SettingsService {
	_instance: SettingsService;

	private settingsRepo: SettingsRepository;

	constructor() {
		if (this._instance === null) this._instance = new SettingsService();
		this.settingsRepo = getCustomRepository(SettingsRepository);
		return this._instance;
	}

	static GetInstance() {
		return new SettingsService();
	}

	async create({ chat, username }: ISettingsCreate): Promise<Setting> {
		const userNameAlreadyExists = await this.settingsRepo.findOne({ username });
		if (userNameAlreadyExists) {
			throw new Error('Username already exists');
		}

		const setting = this.settingsRepo.create({
			chat,
			username,
		});
		await this.settingsRepo.save(setting);

		return setting;
	}
}

export default SettingsService;
