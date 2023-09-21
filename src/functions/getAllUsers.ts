import 'reflect-metadata';
import { formatJSONResponse } from '../libs/api-gateway';
import { middyfy } from '../libs/lambda';
import { DiContainer } from '../DiContainer';
import { IUserRepository } from '../repositories/IUserRepository';

export const getAllUsers = async () => {
	const container = new DiContainer().container;
	const repository = container.resolve('IUserRepository') as IUserRepository;

	const users = await repository.findAll();

	if (!users) {
		throw new Error('not found');
	}

	return formatJSONResponse({
		items: users,
	});
};

export const main = middyfy(getAllUsers);
