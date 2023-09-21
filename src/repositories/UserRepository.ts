import { User } from '../models/User';
import { PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient } from '../db/client';
import { IUserRepository } from './IUserRepository';
import { injectable } from 'tsyringe';

@injectable()
export class UserRepository implements IUserRepository{
	public async findAll(): Promise<User[]> {
		const docClient = getDocClient();

		const command = new ScanCommand({
			ProjectionExpression: 'test_partition_key, test_sort_key, email, firstName, lastName, age',
			FilterExpression: '#entityType = :type',
			ExpressionAttributeValues: {
				':type': User.getDynamoDbType(),
			},
			ExpressionAttributeNames: { '#entityType': 'type' },
			TableName: process.env.TABLE_NAME,
		});

		const response = await docClient.send(command);

		if (response.Items.length === 0) {
			return null;
		}

		return response.Items.map((i) => this.mapDynamoEntityToClass(i));
	}

	public async create(obj: any): Promise<any> {
		console.log('REAL CREATE');


		const docClient = getDocClient();

		const timestamp = new Date().getTime();

		const user = new User(timestamp, obj.firstName, obj.lastName, obj.email, obj.age);

		const command = new PutCommand({
			TableName: process.env.TABLE_NAME,
			Item: user.toItem(),
		});

		const response = await docClient.send(command);

		return response;
	}

	public async findOne(id: number): Promise<User> {
		const docClient = getDocClient();

		const command = new QueryCommand({
			ProjectionExpression: 'test_partition_key, test_sort_key, email, firstName, lastName, age',
			TableName: process.env.TABLE_NAME,
			KeyConditionExpression:
                'test_partition_key = :userid AND test_sort_key = :userid',
			ExpressionAttributeValues: {
				':userid': `USER#${id}`,
			},
			ConsistentRead: true,
		});

		const response = await docClient.send(command);

		if (response.Items.length === 0) {
			return null;
		}

		return this.mapDynamoEntityToClass(response.Items[0]);
	}

	private mapDynamoEntityToClass(entity: any): User {
		const id = Number(entity.test_sort_key.split('#')[1]);

		return new User(id, entity.firstName, entity.lastName, entity.email, entity.age);
	}

}
