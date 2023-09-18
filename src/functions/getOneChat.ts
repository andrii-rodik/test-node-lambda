import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {ChatRepository} from "../repositories/ChatRepository";

const getOneChat = async (event) => {
    const repository = new ChatRepository();
    const id = event.pathParameters.id;

    const chat = await repository.findOne(id);

    if (!chat) {
        throw new Error('not found');
    }

    return formatJSONResponse({
        item: chat,
    });
};

export const main = middyfy(getOneChat);
