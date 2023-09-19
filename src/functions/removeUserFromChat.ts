import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {formatJSONResponse} from "@libs/api-gateway";
import {UserInChat} from "../models/UserInChat";
import {UserRepository} from "../repositories/UserRepository";
import {UserInChatRepository} from "../repositories/UserInChatRepository";

const schema = UserInChat.getSchema();

const removeUserFromChat: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const userRepository = new UserRepository();
  const userInChatRepository = new UserInChatRepository();

  const eventData = event.body;

  const user = await userRepository.findOne(eventData.userId);

  if (!user) {
    throw new Error('user was not found');
  }

  const response = await userInChatRepository.remove(eventData.userId, eventData.chatId);

  return formatJSONResponse(response);
};

export const main = middyfy(removeUserFromChat);
