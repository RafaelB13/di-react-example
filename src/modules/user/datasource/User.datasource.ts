import { axiosInstance } from "@shared/api/axios";
import { User } from "@modules/user/entities/user.entity";

export interface IUserDataSource {
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
}

export class UserDataSource implements IUserDataSource {
    async findAll(): Promise<User[]> {
        const response = await axiosInstance.get<User[]>('/users');

        return response.data;
    }

    async findOne(id: string): Promise<User> {
        const response = await axiosInstance.get<User>(`/users/${id}`);

        return response.data;
    }
}