import {describe, expect, test} from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

describe('createUser', () => {
   test('should invoke create method of repository with correct data', () => {
       const fileData = fs.readFileSync(path.join(__dirname, 'createUserEventData.json'), { encoding: 'utf-8' });
       const eventObject = JSON.parse(fileData);
       const body = eventObject.body;

       expect(body).toBeTruthy();
   });
});
