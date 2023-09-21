import 'reflect-metadata';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { User } from '../models/User';
import { DiContainer } from '../DiContainer';
import { IUserInChatRepository } from '../repositories/IUserInChatRepository';
import { IUserRepository } from '../repositories/IUserRepository';

export const getUsersInChat = async (event) => {
	const container = new DiContainer().container;
	const repository = container.resolve('IUserInChatRepository') as IUserInChatRepository;
	const userRepository = container.resolve('IUserRepository') as IUserRepository;
	const chatId = event.pathParameters.chatid;

	const userInChatsEntities = await repository.findAllByChatId(chatId);

	const users: User[] = [];
	for (const uic of userInChatsEntities) {
		const user = await userRepository.findOne(uic.userId);
		users.push(user);
	}

	return formatJSONResponse({
		items: users,
	});
};

export const main = middyfy(getUsersInChat);
