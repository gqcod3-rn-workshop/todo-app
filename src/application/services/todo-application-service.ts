import AddTodoUseCase from "@/src/application/usecases/add-todo-usecase";
import DeleteTodoUseCase from "@/src/application/usecases/delete-todo-usecase";
import FetchAllTodosUseCase from "@/src/application/usecases/fetch-all-todos-usecase";
import UpdateTodoStatusUseCase from "@/src/application/usecases/update-todo-status-usecase";
import TodoRepository from "@/src/domain/repositories/todo-repository";

/**
 * Todo Application Service
 * @summary
 * Application Service that acts as a facade for all Todo use cases. It coordinates the use cases and manages application state. 
 */
class TodoApplicationService {
    private readonly repository: TodoRepository;
    private readonly addTodoUseCase: AddTodoUseCase;
    private readonly deleteTodoUseCase: DeleteTodoUseCase;
    private readonly fetchAllTodosUseCase: FetchAllTodosUseCase;
    private readonly updateTodoStatusUseCase: UpdateTodoStatusUseCase;

    constructor(repository: TodoRepository) {
        this.repository = repository;
        this.addTodoUseCase = new AddTodoUseCase(this.repository);
        this.deleteTodoUseCase = new DeleteTodoUseCase(this.repository);
        this.fetchAllTodosUseCase = new FetchAllTodosUseCase(this.repository);
        this.updateTodoStatusUseCase = new UpdateTodoStatusUseCase(this.repository);
    }

    /**
     * Adds a new todo
     */
    async addTodo(todoData: {
        title: string;
        category: 'task' | 'event' | 'goal';
        date: string;
        time: string;
        notes: string;
    }): Promise<void> {
        return this.addTodoUseCase.execute(todoData);
    }

    /**
     * Gets all todos
     */
    async getAllTodos() {
        return this.fetchAllTodosUseCase.execute();
    }

    /**
     * Updates the status of a todo
     */
    async updateTodoStatus(id: string, isCompleted: boolean): Promise<void> {
        return this.updateTodoStatusUseCase.execute(id, isCompleted);
    }

    /**
     * Deletes a todo
     */
    async deleteTodo(id: string): Promise<void> {
        return this.deleteTodoUseCase.execute(id);
    }
}

export default TodoApplicationService;