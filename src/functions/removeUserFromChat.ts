import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {DeleteCommand, DynamoDBDocumentClient, QueryCommand} from "@aws-sdk/lib-dynamodb";
import {formatJSONResponse} from "@libs/api-gateway";
import {UserInChat} from "../models/UserInChat";

const schema = UserInChat.getSchema();

const removeUserFromChat: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const client = new DynamoDBClient();
  const docClient = DynamoDBDocumentClient.from(client);

  const eventData = event.body;

  const findResponse = await docClient.send(new QueryCommand({
    TableName: "tb1",
    KeyConditionExpression:
        "test_partition_key = :userid",
    ExpressionAttributeValues: {
      ":userid": `USER#${eventData.userId}`,
    },
    ConsistentRead: true,
  }));

  const user = findResponse.Items;

  if (user.length === 0) {
    throw new Error('user was not found');
  }

  const command = new DeleteCommand({
    TableName: "tb1",
    Key: {
      test_partition_key: `USER#${eventData.userId}`,
      test_sort_key: `CHAT#${eventData.chatId}`,
    },
  });

  const response = await docClient.send(command);

  return formatJSONResponse(response);
};

export const main = middyfy(removeUserFromChat);
