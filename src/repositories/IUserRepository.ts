import { IRepository } from './IRepository';
import { User } from '../models/User';

export interface IUserRepository extends IRepository<User> {}
