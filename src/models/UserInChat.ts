import {BaseEntity} from "./BaseEntity";

export class UserInChat extends BaseEntity {
    public userId: string;
    public chatId: string;
    public connectionDate: string;
    constructor(userId: string, chatId: string, connectionDate: string) {
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
            type: "object",
            properties: {
                chatId: { type: 'string' },
                userId: { type: 'string' },
            },
            required: ['chatId', 'userId']
        } as const;
    }

    public static getDynamoDbType() {
        return 'UserInChat';
    }
}
