import {IRepository} from "./IRepository";
import {Chat} from "../models/Chat";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, PutCommand, QueryCommand, ScanCommand} from "@aws-sdk/lib-dynamodb";
import {User} from "../models/User";

export class ChatRepository implements IRepository<Chat> {
    public async create(obj: any): Promise<any> {
        const client = new DynamoDBClient();
        const docClient = DynamoDBDocumentClient.from(client);

        const timestamp = new Date().getTime();

        const chat = new Chat(timestamp, obj.name, obj.topic);

        const command = new PutCommand({
            TableName: "tb1",
            Item: chat.toItem(),
        });

        const response = await docClient.send(command);

        return response;
    }

    public async findAll(): Promise<Chat[]> {
        const client = new DynamoDBClient();
        const docClient = DynamoDBDocumentClient.from(client);

        const command = new ScanCommand({
            ProjectionExpression: "test_partition_key, test_sort_key, #chatName, topic",
            TableName: "tb1",
            ExpressionAttributeNames: { '#chatName': 'name', '#entityType': 'type' },
            FilterExpression: "#entityType = :type",
            ExpressionAttributeValues: {
                ":type": User.getDynamoDbType(),
            },
        });

        const response = await docClient.send(command);

        if (response.Items.length === 0) {
            return null;
        }

        return response.Items as Chat[];
    }

    public async findOne(id: number): Promise<Chat> {
        const client = new DynamoDBClient({});
        const docClient = DynamoDBDocumentClient.from(client);

        const command = new QueryCommand({
            TableName: "tb1",
            KeyConditionExpression:
                "test_partition_key = :chatid AND test_sort_key = :chatid",
            ExpressionAttributeValues: {
                ":chatid": `CHAT#${id}`,
            },
            ConsistentRead: true,
        });

        const response = await docClient.send(command);

        if (response.Items.length === 0) {
            return null;
        }

        return response.Items[0] as Chat;
    }

}
