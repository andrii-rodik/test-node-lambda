import {BaseEntity} from "./BaseEntity";

export class User extends BaseEntity {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public age: number;
    constructor(id: number, firstName: string, lastName: string, email: string, age: number) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
    }
    public get partitionKey(): string {
        return `USER#${this.id}`;
    }

    public get sortKey(): string {
        return `USER#${this.id}`;
    }

    public toItem(): Record<string, unknown> {
        return {
            ...this.keys(),
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            age: this.age,
            type: User.getDynamoDbType(),
        };
    }

    public static getSchema() {
        return {
            type: "object",
            properties: {
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string' },
                age: { type: 'integer' },
            },
            required: ['firstName', 'lastName', 'email', 'age']
        } as const;
    }

    public static getDynamoDbType() {
        return 'User';
    }
}

