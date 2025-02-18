import { User } from "@modules/user/entities/user.entity";
import { IUserRepository } from "@modules/user/repository/User.repository";

export interface IUserUseCase {
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
}

export class UserUseCase implements IUserUseCase {
    constructor (
        private readonly userDataSource: IUserRepository
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userDataSource.findAll();
    }

    async findOne(id: string): Promise<User> {
        return await this.userDataSource.findOne(id);
    }
}