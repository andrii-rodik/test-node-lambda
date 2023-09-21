import 'reflect-metadata';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DiContainer } from '../DiContainer';
import { IChatRepository } from '../repositories/IChatRepository';

export const getAllChats = async () => {
	const container = new DiContainer().container;
	const repository = container.resolve('IChatRepository') as IChatRepository;

	const chats = await repository.findAll();

	if (!chats) {
		throw new Error('not found');
	}

	return formatJSONResponse({
		items: chats,
	});
};

export const main = middyfy(getAllChats);
