import TodoEntity from "../entities/todo-entity";

/**
 * Todo Repository Interface
 * @summary
 * This interface defines the contract for a Todo repository, including methods for creating, fetching, and deleting todo tasks.
 * 
 * @method deleteTodo - Deletes a todo task by its unique identifier.
 * @method fetchAllTodos - Retrieves all todo tasks.
 * @method createTodo - Creates a new todo task.
 */
interface TodoRepository {
    /**
     * Deletes a todo task by its ID.
     * @param id - The unique identifier of the todo task to be deleted.
     */
    deleteTodo(id: string): Promise<void>;
    /**
     * Fetches all todo tasks.
     * @returns A promise that resolves to an array of TodoEntity objects.
     */
    fetchAllTodos(): Promise<TodoEntity[]>;
    /**
     * Creates a new todo task.
     * @param todo - The TodoEntity object representing the new todo task to be created.
     */
    createTodo(todo: TodoEntity): Promise<void>;
};

export default TodoRepository;