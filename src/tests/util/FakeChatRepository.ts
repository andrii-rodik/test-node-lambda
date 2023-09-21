import {IChatRepository} from "../../repositories/IChatRepository";
import {Chat} from "../../models/Chat";

export class FakeChatRepository implements IChatRepository{
    create(obj: any): Promise<any> {
        throw new Error('not implemented');
    }

    findAll(): Promise<Chat[]> {
        throw new Error('not implemented');
    }

    findOne(id: number): Promise<Chat> {
        throw new Error('not implemented');
    }

}
