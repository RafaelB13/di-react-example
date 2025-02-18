import { User } from "@modules/user/entities/user.entity";
import { IUserDataSource } from "@modules/user/datasource/User.datasource";

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
}

export class UserRepository implements IUserRepository {
    constructor(
        private readonly userDataSource: IUserDataSource
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userDataSource.findAll();
    }

    async findOne(id: string): Promise<User> {
        return await this.userDataSource.findOne(id);
    }
}