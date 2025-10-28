import TodoApplicationService from "@/src/application/services/todo-application-service";
import { TodoSQLiteRepositoryImpl } from "@/src/infrastructure/repositories";
import React, { useContext, useMemo } from "react";

/**
 * Context for Todo Application Service
 * @summary
 * Context that provides access to the TodoApplicationService throughout the application.
 */

/**
 * Context for Todo Application Service
 */
const TodoContext = React.createContext<TodoApplicationService | undefined>(undefined);

/**
 * Hook to access the Application Service
 */
export const useTodoService = (): TodoApplicationService => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoService must be used within a TodoProvider');
    }
    return context;
}

/**
 * Simplify Todo Provider for Application Service
 */
export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    const todoService = useMemo(() => {
        const repo = new TodoSQLiteRepositoryImpl();
        return new TodoApplicationService(repo);
    }, []);

    return (
        <TodoContext.Provider value={todoService}>
            {children}
        </TodoContext.Provider>
    );
};