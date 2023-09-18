import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {ChatRepository} from "../repositories/ChatRepository";

const getAllChats = async () => {
  const repository = new ChatRepository();

  const chats = await repository.findAll();

  if (!chats) {
    throw new Error('not found');
  }

  return formatJSONResponse({
    items: chats,
  });
};

export const main = middyfy(getAllChats);
