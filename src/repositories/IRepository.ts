export interface IRepository<T> {
    findAll(): Promise<T[]>;

    create(obj: any): Promise<any>;

    findOne(id: number): Promise<T>;
}
