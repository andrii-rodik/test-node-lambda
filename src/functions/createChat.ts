import 'reflect-metadata';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Chat } from '../models/Chat';
import { DiContainer } from '../DiContainer';
import { IChatRepository } from '../repositories/IChatRepository';

const schema = Chat.getSchema();

export const createChat: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	const container = new DiContainer().container;
	const repository = container.resolve('IChatRepository') as IChatRepository;

	const response = await repository.create(event.body);

	return formatJSONResponse(response);
};

export const main = middyfy(createChat);
