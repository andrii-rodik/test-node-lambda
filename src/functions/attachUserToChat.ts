import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {UserInChat} from "../models/UserInChat";
import {UserInChatRepository} from "../repositories/UserInChatRepository";

const schema = UserInChat.getSchema();

const attachUserToChat: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const repository = new UserInChatRepository();
  const eventData = event.body;

  const response = await repository.create(eventData);

  return formatJSONResponse(response);
};

export const main = middyfy(attachUserToChat);
