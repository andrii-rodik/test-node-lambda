import 'reflect-metadata';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DiContainer } from '../DiContainer';
import { IChatRepository } from '../repositories/IChatRepository';

export const getOneChat = async (event) => {
	const container = new DiContainer().container;
	const repository = container.resolve('IChatRepository') as IChatRepository;
	const id = event.pathParameters.id;

	const chat = await repository.findOne(id);

	if (!chat) {
		throw new Error('not found');
	}

	return formatJSONResponse({
		item: chat,
	});
};

export const main = middyfy(getOneChat);
