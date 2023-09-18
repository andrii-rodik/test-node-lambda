import {User} from "../models/User";
import {IRepository} from "./IRepository";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, PutCommand, QueryCommand, ScanCommand} from "@aws-sdk/lib-dynamodb";

export class UserRepository implements IRepository<User>{
    public async findAll(): Promise<User[]> {
        const client = new DynamoDBClient();
        const docClient = DynamoDBDocumentClient.from(client);

        const command = new ScanCommand({
            ProjectionExpression: "test_partition_key, test_sort_key, email, firstName, lastName, age",
            FilterExpression: "#entityType = :type",
            ExpressionAttributeValues: {
                ":type": User.getDynamoDbType(),
            },
            ExpressionAttributeNames: { '#entityType': 'type' },
            TableName: "tb1",
        });

        const response = await docClient.send(command);

        if (response.Items.length === 0) {
            return null;
        }

        return response.Items as User[];
    }

    public async create(obj: any): Promise<any> {
        const client = new DynamoDBClient();
        const docClient = DynamoDBDocumentClient.from(client);

        const timestamp = new Date().getTime();

        const user = new User(timestamp, obj.firstName, obj.lastName, obj.email, obj.age);

        const command = new PutCommand({
            TableName: "tb1",
            Item: user.toItem(),
        });

        const response = await docClient.send(command);

        return response;
    }

    public async findOne(id: number): Promise<User> {
        const client = new DynamoDBClient();
        const docClient = DynamoDBDocumentClient.from(client);

        const command = new QueryCommand({
            ProjectionExpression: "test_partition_key, test_sort_key, email, firstName, lastName, age",
            TableName: "tb1",
            KeyConditionExpression:
                "test_partition_key = :userid AND test_sort_key = :userid",
            ExpressionAttributeValues: {
                ":userid": `USER#${id}`,
            },
            ConsistentRead: true,
        });

        const response = await docClient.send(command);

        if (response.Items.length === 0) {
            return null;
        }

        return response.Items[0] as User;
    }

}
