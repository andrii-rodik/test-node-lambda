import 'reflect-metadata';
import { formatJSONResponse } from '../libs/api-gateway';
import { middyfy } from '../libs/lambda';
import { DiContainer } from '../DiContainer';
import { IUserRepository } from '../repositories/IUserRepository';

export const getOneUser = async (event) => {
	const container = new DiContainer().container;
	const repository = container.resolve('IUserRepository') as IUserRepository;
	const id = event.pathParameters.id;

	const user = await repository.findOne(id);

	if (!user) {
		throw new Error('not found');
	}

	return formatJSONResponse({
		item: user,
	});
};

export const main = middyfy(getOneUser);
