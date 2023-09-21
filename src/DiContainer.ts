import * as process from 'process';
import { UserRepository } from './repositories/UserRepository';
import { FakeUserRepository } from './tests/util/FakeUserRepository';
import { container } from 'tsyringe';
import { ChatRepository } from './repositories/ChatRepository';
import { UserInChatRepository } from './repositories/UserInChatRepository';
import { FakeUserInChatRepository } from './tests/util/FakeUserInChatRepository';
import { FakeChatRepository } from './tests/util/FakeChatRepository';

export class DiContainer {
	constructor() {
		this.configure();
	}

	public configure() {
		if (process.env.MOCK === 'true') {
			this.configureMockDependencies();
		} else {
			this.configureDependencies();
		}
	}

	public get container() {
		return container;
	}

	private configureDependencies() {
		container.register('IUserRepository', { useClass: UserRepository });
		container.register('IChatRepository', { useClass: ChatRepository });
		container.register('IUserInChatRepository', { useClass: UserInChatRepository });
	}

	private configureMockDependencies() {
		container.register('IUserRepository', { useClass: FakeUserRepository });
		container.register('IChatRepository', { useClass: FakeChatRepository });
		container.register('IUserInChatRepository', { useClass: FakeUserInChatRepository });
	}
}


