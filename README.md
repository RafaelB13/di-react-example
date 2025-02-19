# React with TypeScript, Vite, and Dependency Injection

This application uses **React**, **TypeScript**, and **Vite**. To better organize imports, **aliases** have been configured in both `tsconfig.app.json` and `vite.config.ts`.

---

## Dependency Injection

The application employs the **Dependency Injection** pattern using the [Awilix](https://github.com/jeffijoe/awilix) library. This approach centralizes service registration in a single container, making the application easier to maintain, scale, and test.

---

## Dependency Container

The container is configured in `@shared/container.ts`. Here, dependencies are registered with their aliases:

- **UserDataSource**: Responsible for fetching user data via `axiosInstance`.
- **UserRepository**: Acts as an intermediary layer between the data source and business logic.
- **UserUseCase**: Encapsulates user-related business logic and uses the repository to perform operations.

### Example container configuration:

```typescript
import { createContainer, asClass } from "awilix";
import { UserDataSource } from "@modules/user/datasources/UserDataSource";
import { UserRepository } from "@modules/user/repositories/UserRepository";
import { UserUseCase } from "@modules/user/usecases/UserUseCase";

const container = createContainer();

container.register({
  userDataSource: asClass(UserDataSource).classic(),
  userRepository: asClass(UserRepository).classic(),
  userUseCase: asClass(UserUseCase).classic(),
});

export default container;
```

---

## Dependency Provider

To allow components to access dependencies, a context is defined in `@shared/providers/dependency-provider.tsx`. The container is made available to the entire component tree.

### Example of `dependency-provider.tsx`:

```tsx
import React from "react";
import { AwilixContainer } from "awilix";
import { createContext } from "react";

const DependencyContext = createContext<AwilixContainer | null>(null);

type DependencyProviderProps = {
  container: AwilixContainer;
  children: React.ReactNode;
};

export const DependencyProvider: React.FC<DependencyProviderProps> = ({ container, children }) => {
  return (
    <DependencyContext.Provider value={container}>
      {children}
    </DependencyContext.Provider>
  );
};

export { DependencyContext };
```

---

## Injection Hook

To use the services registered in the container, the application defines a custom hook in `@shared/hooks/use-dependency.ts`.

### Example of `use-dependency.ts`:

```typescript
import React from "react";
import { DependencyContext } from "@shared/providers/dependency-provider";

export const useDependency = <T,>(key: string): T => {
  const container = React.useContext(DependencyContext);
  if (!container) {
    throw new Error("DependencyProvider not found");
  }
  return container.resolve<T>(key);
};
```

---

## Example Component

In the component `@modules/user/pages/GetUsers.tsx`, the `useDependency` hook is used to retrieve the `UserUseCase` instance and call its method to fetch user data.

### Example of `GetUsers.tsx`:

```tsx
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
```

---

## Application Configuration

The application entry file, `@shared/main.tsx`, uses the `DependencyProvider` to wrap the main component (`App`), ensuring that all dependencies are injected into the component tree.

### Example of `main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { DependencyProvider } from "@shared/providers/dependency-provider";
import container from "@shared/container";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DependencyProvider container={container}>
      <App />
    </DependencyProvider>
  </React.StrictMode>
);
```

---

## Conclusion

Using this architecture with dependency injection and aliases promotes more modular and organized code. This structure facilitates maintenance, enables scalability, and simplifies the replacement or creation of mocks for testing.

---

Author [Rafael Borges](https://github.com/RafaelB13).