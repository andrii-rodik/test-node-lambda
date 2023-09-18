import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {DynamoDBDocumentClient, QueryCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

const getUsersInChat = async (event) => {
    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);

    const chatId = event.pathParameters.chatid;

    const command = new QueryCommand({
        TableName: "tb1",
        IndexName: "test_sort_key-index",
        KeyConditionExpression:
            "test_sort_key = :chatId",
        ExpressionAttributeValues: {
            ":chatId": `CHAT#${chatId}`,
        },
    });

    const response = await docClient.send(command);

  return formatJSONResponse({
    items: response.Items,
  });
};

export const main = middyfy(getUsersInChat);
