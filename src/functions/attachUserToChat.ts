import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {UserInChat} from "../models/UserInChat";

const schema = UserInChat.getSchema();

const attachUserToChat: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const client = new DynamoDBClient();
  const docClient = DynamoDBDocumentClient.from(client);

  const eventData = event.body;

  const connectionDate = new Date().toString();

  const userInChat = new UserInChat(eventData.userId, eventData.chatId, connectionDate);

  const command = new PutCommand({
    TableName: "tb1",
    Item: userInChat.toItem(),
  });

  const response = await docClient.send(command);

  return formatJSONResponse(response);
};

export const main = middyfy(attachUserToChat);
