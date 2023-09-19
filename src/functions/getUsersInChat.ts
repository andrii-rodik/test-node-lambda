import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {UserInChatRepository} from "../repositories/UserInChatRepository";
import {User} from "../models/User";
import {UserRepository} from "../repositories/UserRepository";

const getUsersInChat = async (event) => {
    const repository = new UserInChatRepository();
    const userRepository = new UserRepository();
    const chatId = event.pathParameters.chatid;

    const userInChatsEntities = await repository.findAllByChatId(chatId);

    const users: User[] = [];
    for (const uic of userInChatsEntities) {
        const user = await userRepository.findOne(uic.userId);
        users.push(user);
    }

    return formatJSONResponse({
        items: users,
    });
};

export const main = middyfy(getUsersInChat);
