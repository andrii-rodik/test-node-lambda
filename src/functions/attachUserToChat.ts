import 'reflect-metadata';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { UserInChat } from '../models/UserInChat';
import { DiContainer } from '../DiContainer';
import { IUserInChatRepository } from '../repositories/IUserInChatRepository';

const schema = UserInChat.getSchema();

export const attachUserToChat: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	const container = new DiContainer().container;
	const repository = container.resolve('IUserInChatRepository') as IUserInChatRepository;
	const eventData = event.body;

	const response = await repository.create(eventData);

	return formatJSONResponse(response);
};

export const main = middyfy(attachUserToChat);
