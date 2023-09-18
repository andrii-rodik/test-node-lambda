import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {UserRepository} from "../repositories/UserRepository";

const getAllUsers = async () => {
  const repository = new UserRepository();

  const users = await repository.findAll();

  if (!users) {
    throw new Error('not found');
  }

  return formatJSONResponse({
    items: users,
  });
};

export const main = middyfy(getAllUsers);
