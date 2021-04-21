import { getCustomRepository } from 'typeorm';
import User from '../entities/User';
import UsersRepository from '../repositories/UsersRepository';

interface IUserCreate {
	email: string;
}

class UsersService {
	_instance: UsersService;

	private usersRepository: UsersRepository;

	constructor() {
		if (this._instance === null) this._instance = new UsersService();
		this.usersRepository = getCustomRepository(UsersRepository);

		return this._instance;
	}

	static GetInstance() {
		return new UsersService();
	}

	async create({ email }: IUserCreate): Promise<User> {
		const userExists = await this.usersRepository.findOne({ email });
		if (userExists) {
			return userExists;
		}

		const user = this.usersRepository.create({ email });
		await this.usersRepository.save(user);
		return user;
	}
}

export default UsersService;
