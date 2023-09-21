import {UserInChat} from "../../models/UserInChat";
import {IUserInChatRepository} from "../../repositories/IUserInChatRepository";

export class FakeUserInChatRepository implements IUserInChatRepository{
    create(obj: { userId: number; chatId: number }): Promise<any> {
        throw new Error('not implemented');
    }

    findAllByChatId(chatId: string): Promise<UserInChat[]> {
        throw new Error('not implemented');
    }

    remove(userId: number, chatId: number): Promise<any> {
        throw new Error('not implemented');
    }

}
