import { createContainer, asClass } from "awilix";

import { UserDataSource } from "@modules/user/datasource/User.datasource";
import { UserRepository } from "@modules/user/repository/User.repository";
import { UserUseCase } from "@modules/user/usecase/User.usecase";

const container = createContainer();

container.register({

  //DataSource
  userDataSource: asClass(UserDataSource).classic(),
  //Repository
  userRepository: asClass(UserRepository).classic(),
  //UseCase
  userUseCase: asClass(UserUseCase).classic(),

});

export default container;