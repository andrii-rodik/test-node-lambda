import { describe, expect, test } from '@jest/globals';
import * as process from 'process';
import { FakeUserRepository } from './util/FakeUserRepository';
import { User } from '../models/User';
import { getAllUsers } from '../functions/getAllUsers';

describe('getAllUsers', () => {
	beforeAll(() => {
		process.env.MOCK = 'true';
        
	});

	test('should invoke create getAll of repository', async () => {
		// arrange
		const createFunctionMock = jest
			.spyOn(FakeUserRepository.prototype, 'findAll')
			.mockImplementation(() => {
				return Promise.resolve([new User(1, 'fname', 'lname', 'email@mail.com', 18)]);
			});

		// act
		await getAllUsers();

		// assert
		expect(createFunctionMock).toBeCalledWith();
	});

	test('should throw an error in case of null result of function', async () => {
		// arrange
		jest.spyOn(FakeUserRepository.prototype, 'findAll').mockImplementation();

		// act
		try {
			await getAllUsers();
		} catch (e) {
			// assert
			expect(e.message).toBe('not found');
		}
	});
});
