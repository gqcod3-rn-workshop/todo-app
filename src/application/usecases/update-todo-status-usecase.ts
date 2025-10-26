import TodoRepository from "@/src/domain/repositories/todo-repository";

/**
 * Update Todo Status Use Case
 * @summary
 * This use case handles the updating of a todo task's completion status by interacting with the TodoRepository.
 * 
 * @method execute - Executes the use case to update the completion status of a todo task.
 */
class UpdateTodoStatusUseCase {

    /**
     * Creates an instance of UpdateTodoStatusUseCase.
     * @param todoRepository  - An implementation of the TodoRepository interface to handle data operations.
     */
    constructor(private todoRepository: TodoRepository) { }

    /**
     * Executes the use case to update the completion status of a todo task.
     * @param id - The unique identifier of the todo task to be updated.
     * @param isCompleted - The new completion status of the todo task.
     */
    async execute(id: string, isCompleted: boolean): Promise<void> {
        await this.todoRepository.updateTodoStatus(id, isCompleted);
    }
};

export default UpdateTodoStatusUseCase;