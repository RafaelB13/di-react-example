import React from "react";
import { DependencyContext } from "@shared/providers/dependency-provider";

export const useDependency = <T>(key: string): T => {
    const container = React.useContext(DependencyContext);
    if (!container) {
        throw new Error('DependencyProvider not found');
    }
    return container.resolve<T>(key);
};
