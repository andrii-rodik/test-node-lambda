import { describe, expect, test } from '@jest/globals';
import * as process from 'process';
import { FakeUserRepository } from './util/FakeUserRepository';
import { User } from '../models/User';
import { getOneUser } from '../functions/getOneUser';

describe('getOneUser', () => {
	beforeAll(() => {
		process.env.MOCK = 'true';

	});

	test('should invoke create findOne of repository with correct data', async () => {
		// arrange
		const createFunctionMock = jest
			.spyOn(FakeUserRepository.prototype, 'findOne')
			.mockImplementation(() => {
				return Promise.resolve(new User(228, 'fname', 'lname', 'email@mail.com', 18));
			});

		// act
		await getOneUser({ pathParameters: { id: 228 } });

		// assert
		expect(createFunctionMock).toBeCalledWith(228);
	});

	test('should throw an error in case of null result of function', async () => {
		// arrange
		jest.spyOn(FakeUserRepository.prototype, 'findOne').mockImplementation();

		// act
		try {
			await getOneUser({ pathParameters: { id: 228 } });
		} catch (e) {
			// assert
			expect(e.message).toBe('not found');
		}
	});
});
