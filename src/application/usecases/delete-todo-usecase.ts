import TodoRepository from "@/src/domain/repositories/todo-repository";

/**
 * Delete Todo Use Case
 * @summary
 * This use case handles the deletion of a todo task by interacting with the TodoRepository.
 * 
 * @method execute - Executes the use case to delete a todo task by its ID.
 */
class DeleteTodoUseCase {

    /**
     * Creates an instance of DeleteTodoUseCase.
     * @param todoRepository - An implementation of the TodoRepository interface to handle data operations.
     */
    constructor(private todoRepository: TodoRepository) { }

    /**
     * Executes the use case to delete a todo task by its ID.
     * @param id - The ID of the todo task to delete.
     */
    async execute(id: string): Promise<void> {
        await this.todoRepository.deleteTodo(id);
    }
};

export default DeleteTodoUseCase;