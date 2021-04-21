import { getCustomRepository } from 'typeorm';
import Message from '../entities/Message';
import MessageRepository from '../repositories/MessageRepository';

interface IMessageCreate {
	text: string;
	user_id: string;
	admin_id?: string;
}
let a = 0;

class MessagesService {
	_instance: MessagesService;

	private messageRepository: MessageRepository;

	constructor() {
		if (this._instance === null) {
			this._instance = new MessagesService();
		}
		this.messageRepository = getCustomRepository(MessageRepository);
		return this._instance;
	}

	static GetInstance() {
		return new MessagesService();
	}

	async create({
		text,
		user_id,
		admin_id = '',
	}: IMessageCreate): Promise<Message> {
		const message = this.messageRepository.create({ text, user_id, admin_id });
		await this.messageRepository.save(message);
		return message;
	}

	async listByUser(user_id: string) {
		const messages = await this.messageRepository.find({
			where: { user_id },
			// esse cara que gera a relação entre as tabelas
			relations: ['user'],
		});

		return messages;
	}
}

export default MessagesService;
