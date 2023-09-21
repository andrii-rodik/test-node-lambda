import { BaseEntity } from './BaseEntity';

export class UserInChat extends BaseEntity {
	public userId: number;
	public chatId: number;
	public connectionDate: string;
	constructor(userId: number, chatId: number, connectionDate: string) {
		super();
		this.userId = userId;
		this.chatId = chatId;
		this.connectionDate = connectionDate;
	}
	public get partitionKey(): string {
		return `USER#${this.userId}`;
	}

	public get sortKey(): string {
		return `CHAT#${this.chatId}`;
	}

	public toItem(): Record<string, unknown> {
		return {
			...this.keys(),
			connectionDate: this.connectionDate,
			type: UserInChat.getDynamoDbType(),
		};
	}

	public static getSchema() {
		return {
			type: 'object',
			properties: {
				chatId: { type: 'number' },
				userId: { type: 'number' },
			},
			required: ['chatId', 'userId']
		} as const;
	}

	public static getDynamoDbType() {
		return 'UserInChat';
	}
}
