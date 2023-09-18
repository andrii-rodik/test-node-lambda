import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {Chat} from "../models/Chat";
import {ChatRepository} from "../repositories/ChatRepository";

const schema = Chat.getSchema();

const createChat: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const repository = new ChatRepository();

  const response = await repository.create(event.body);

  return formatJSONResponse(response);
};

export const main = middyfy(createChat);
