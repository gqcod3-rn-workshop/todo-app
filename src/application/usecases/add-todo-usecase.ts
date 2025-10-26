import TodoEntity from "@/src/domain/entities/todo-entity";
import TodoRepository from "@/src/domain/repositories/todo-repository";

/**
 * Add Todo Use Case
 * @summary
 * This use case handles the addition of a new todo task by creating a TodoEntity and saving it through the TodoRepository.
 * 
 * @method execute - Executes the use case to add a new todo task.
 */
class AddTodoUseCase {

    /**
     * Creates an instance of AddTodoUseCase.
     * @param todoRepository - An implementation of the TodoRepository interface to handle data operations.
     */
    constructor(private todoRepository: TodoRepository) { }

    /**
     * Executes the use case to add a new todo task.
     * @param {Object} params - The parameters for creating a new todo task.
     */
    async execute({
        title,
        category,
        date,
        time,
        notes,
    }: {
        title: string;
        category: 'task' | 'event' | 'goal';
        date: string;
        time: string;
        notes: string;
    }): Promise<void> {

        const todoId = crypto.randomUUID();
        const todoDate = new Date(date);
        const todoTime = new Date(`${date}T${time}`);

        const newTodo = new TodoEntity({
            id: todoId,
            title,
            category,
            date: todoDate,
            time: todoTime,
            notes: notes?.trim() || '',
            isCompleted: false,
        });

        await this.todoRepository.createTodo(newTodo);
    }
};

export default AddTodoUseCase;