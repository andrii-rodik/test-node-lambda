import 'reflect-metadata';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { UserInChat } from '../models/UserInChat';
import { DiContainer } from '../DiContainer';
import { IUserInChatRepository } from '../repositories/IUserInChatRepository';
import { IUserRepository } from '../repositories/IUserRepository';

const schema = UserInChat.getSchema();

export const removeUserFromChat: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	const container = new DiContainer().container;
	const userInChatRepository = container.resolve('IUserInChatRepository') as IUserInChatRepository;
	const userRepository = container.resolve('IUserRepository') as IUserRepository;


	const eventData = event.body;

	const user = await userRepository.findOne(eventData.userId);

	if (!user) {
		throw new Error('user was not found');
	}

	const response = await userInChatRepository.remove(eventData.userId, eventData.chatId);

	return formatJSONResponse(response);
};

export const main = middyfy(removeUserFromChat);
