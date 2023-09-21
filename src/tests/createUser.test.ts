import { describe, expect, test } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { createUser } from '../functions/createUser';
import { FakeUserRepository } from './util/FakeUserRepository';

describe('createUser', () => {
	let eventObject;

	beforeAll(() => {
		process.env.MOCK = 'true';

		const fileData = fs.readFileSync(path.join(__dirname, 'createUserEventData.json'), { encoding: 'utf-8' });
		eventObject = JSON.parse(fileData);
	});

	test('should invoke create method of repository with correct data', async () => {
		// arrange
		const createFunctionMock = jest
			.spyOn(FakeUserRepository.prototype, 'create')
			.mockImplementation();

		// act
		await createUser(eventObject, null, null);

		// assert
		expect(createFunctionMock)
			.toBeCalledWith({
				'age': 21,
				'email': 'Tom_Grant80@hotmail.com',
				'firstName': 'Candelario',
				'job': 'Optimization',
				'lastName': 'Strosin'
			});
	});
});
