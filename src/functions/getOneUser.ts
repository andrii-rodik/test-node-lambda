import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {UserRepository} from "../repositories/UserRepository";

const getOneUser = async (event) => {
    const repository = new UserRepository();
    const id = event.pathParameters.id;

    const user = await repository.findOne(id);

    if (!user) {
        throw new Error('not found');
    }

    return formatJSONResponse({
        item: user,
    });
};

export const main = middyfy(getOneUser);
