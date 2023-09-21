import {UserInChat} from '../models/UserInChat';

export interface IUserInChatRepository {
    create(obj: {userId: number, chatId: number}): Promise<any>;

    findAllByChatId(chatId: string): Promise<UserInChat[]>;

    remove(userId: number, chatId: number): Promise<any>;
}
