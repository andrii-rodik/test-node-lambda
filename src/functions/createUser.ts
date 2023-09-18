import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {User} from "../models/User";
import {UserRepository} from "../repositories/UserRepository";

const schema = User.getSchema();

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const repository = new UserRepository();

  const body = event.body;

  const response = await repository.create(body);

  return formatJSONResponse(response);
};

export const main = middyfy(createUser);
