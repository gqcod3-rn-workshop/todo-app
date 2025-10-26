import TodoEntity from "@/src/domain/entities/todo-entity";
import TodoRepository from "@/src/domain/repositories/todo-repository";

/**
 * Todo Repository Implementation
 * @summary
 * Implementation of the TodoRepository interface.
 * 
 * @implements {@link TodoRepository}
 */
class TodoRepositoryImpl implements TodoRepository {
    private todos: TodoEntity[] = [];

    /**
     * Creates a new todo item
     * @param {TodoEntity} todo - The todo entity to create
     * @returns {Promise<void>}
     * @memberof TodoRepositoryImpl
     */
    async createTodo(todo: TodoEntity): Promise<void> {
        this.todos.push(todo);
    }

    /**
     * Retrieves all todo items
     * @returns {Promise<TodoEntity[]>} Array of all todos
     * @memberof TodoRepositoryImpl
     */
    async fetchAllTodos(): Promise<TodoEntity[]> {
        return [...this.todos];
    }

    /**
     * Deletes a todo item by ID
     * @param {string} id - The ID of the todo to delete
     * @returns {Promise<void>}
     * @memberof TodoRepositoryImpl
     */
    async deleteTodo(id: string): Promise<void> {
        this.todos = this.todos.filter(todo => todo.id.getValue() !== id);
    }

    /**
     * Updates the completion status of a todo item
     * @param {string} id - The ID of the todo to update
     * @param {boolean} isCompleted - The new completion status
     * @returns {Promise<void>}
     * @memberof TodoRepositoryImpl
     */
    async updateTodoStatus(id: string, isCompleted: boolean): Promise<void> {
        const todoIndex = this.todos.findIndex(todo => todo.id.getValue() === id);
        if (todoIndex !== -1) {
            const existingTodo = this.todos[todoIndex];
            this.todos[todoIndex] = new TodoEntity({
                ...existingTodo,
                isCompleted
            });
        }
    }
}

export default TodoRepositoryImpl;
