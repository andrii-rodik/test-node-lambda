import { IUserRepository } from '../../repositories/IUserRepository';
import { User } from '../../models/User';

export class FakeUserRepository implements IUserRepository{
	public async findAll(): Promise<User[]> {
		throw new Error('not implemented');
	}

	public async create(obj: any): Promise<any> {
		throw new Error('not implemented');
	}

	public async findOne(id: number): Promise<User> {
		throw new Error('not implemented');
	}
}
