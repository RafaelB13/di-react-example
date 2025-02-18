import React, { useEffect, useState } from "react";
import { useDependency } from "@shared/hooks/use-dependency";
import { User } from "@modules/user/entities/user.entity";
import { UserUseCase } from "@modules/user/usecase/User.usecase";
import container from "@shared/container";

const GetUsers: React.FC = () => {
  const [users, setUsers] = useState<User>({} as User);

  const userUseCase = useDependency<UserUseCase>("userUseCase");

  useEffect(() => {
    userUseCase.findOne('1').then((users) => {
      setUsers(users);
    });
  }, [userUseCase]);

  return (
    <>
      <h1>Example</h1>
      <div className="users-list">
        <div className="card">
          <h2>User Info</h2>
          <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
        <div>
          <h2>Container Registrations</h2>
          <pre>{JSON.stringify(container.registrations, null, 2)}</pre>
        </div>
      </div>
    </>
  );
};

export default GetUsers;
