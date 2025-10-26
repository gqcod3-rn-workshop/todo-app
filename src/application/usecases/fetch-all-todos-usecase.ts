import TodoEntity from "@/src/domain/entities/todo-entity";
import TodoRepository from "@/src/domain/repositories/todo-repository";

/**
 * Fetch All Todos Use Case
 * @summary
 * This use case handles the retrieval of all todo tasks by interacting with the TodoRepository.
 * 
 * @method execute - Executes the use case to fetch all todo tasks.
 */
class FetchAllTodosUseCase {
    /**
     * Creates an instance of FetchAllTodosUseCase.
     * @param todoRepository - An implementation of the TodoRepository interface to handle data operations.
     */
    constructor(private todoRepository: TodoRepository) { }

    /**
     * Executes the use case to fetch all todo tasks.
     * @returns A promise that resolves to an array of TodoEntity objects.
     */
    async execute(): Promise<TodoEntity[]> {
        const todos = await this.todoRepository.fetchAllTodos();
        return todos;
    }
};

export default FetchAllTodosUseCase;