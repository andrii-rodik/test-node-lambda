import 'reflect-metadata';
import type { ValidatedEventAPIGatewayProxyEvent } from '../libs/api-gateway';
import { formatJSONResponse } from '../libs/api-gateway';
import { middyfy } from '../libs/lambda';
import { User } from '../models/User';
import { DiContainer } from '../DiContainer';
import { IUserRepository } from '../repositories/IUserRepository';

const schema = User.getSchema();

export const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	const container = new DiContainer().container;
	const repository = container.resolve('IUserRepository') as IUserRepository;
	const body = event.body;

	const response = await repository.create(body);

	return formatJSONResponse(response);
};

export const main = middyfy(createUser);
