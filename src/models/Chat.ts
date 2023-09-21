import { BaseEntity } from './BaseEntity';

export class Chat extends BaseEntity {
	public id: number;
	public topic: string;
	public name: string;
	constructor(id: number, name: string, topic: string) {
		super();
		this.id = id;
		this.topic = topic;
		this.name = name;
	}
	public get partitionKey(): string {
		return `CHAT#${this.id}`;
	}

	public get sortKey(): string {
		return `CHAT#${this.id}`;
	}

	public toItem(): Record<string, unknown> {
		return {
			...this.keys(),
			topic: this.topic,
			name: this.name,
			type: Chat.getDynamoDbType(),
		};
	}

	public static getSchema() {
		return {
			type: 'object',
			properties: {
				name: { type: 'string' },
				topic: { type: 'string' },
			},
			required: ['name', 'topic']
		} as const;
	}

	public static getDynamoDbType() {
		return 'Chat';
	}
}
