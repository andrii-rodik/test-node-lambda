import { UserInChat } from '../models/UserInChat';
import { DeleteCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient } from '../db/client';
import { IUserInChatRepository } from './IUserInChatRepository';

export class UserInChatRepository implements IUserInChatRepository{
	public async create(obj: {userId: number, chatId: number}): Promise<any> {
		const docClient = getDocClient();

		const connectionDate = new Date().toString();

		const userInChat = new UserInChat(obj.userId, obj.chatId, connectionDate);

		const command = new PutCommand({
			TableName: process.env.TABLE_NAME,
			Item: userInChat.toItem(),
		});

		const response = await docClient.send(command);

		return response;
	}

	public async findAllByChatId(chatId: string): Promise<UserInChat[]> {
		const docClient = getDocClient();

		const command = new QueryCommand({
			TableName: process.env.TABLE_NAME,
			IndexName: 'test_sort_key-index',
			KeyConditionExpression:
                'test_sort_key = :chatId',
			ExpressionAttributeValues: {
				':chatId': `CHAT#${chatId}`,
				':type': UserInChat.getDynamoDbType(),
			},
			FilterExpression: '#entityType = :type',
			ExpressionAttributeNames: { '#entityType': 'type' },
		});

		const response = await docClient.send(command);

		if (response.Items.length === 0) {
			return null;
		}

		return response.Items.map((i) => this.mapDynamoEntityToClass(i));
	}

	public async remove(userId: number, chatId: number): Promise<any> {
		const docClient = getDocClient();

		const command = new DeleteCommand({
			TableName: process.env.TABLE_NAME,
			Key: {
				test_partition_key: `USER#${userId}`,
				test_sort_key: `CHAT#${chatId}`,
			},
		});

		const response = await docClient.send(command);

		return response;
	}

	private mapDynamoEntityToClass(entity: any): UserInChat {
		const userId = Number(entity.test_partition_key.split('#')[1]);
		const chatId = Number(entity.test_sort_key.split('#')[1]);
		return new UserInChat(userId, chatId, entity.connectionDate);
	}
}
