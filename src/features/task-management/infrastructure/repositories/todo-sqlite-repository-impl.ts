import TodoEntity from "@/src/features/task-management/domain/entities/todo-entity";
import TodoRepository from "@/src/features/task-management/domain/repositories/todo-repository";
import { TodoMapper, TodoRecord } from "../database/schemas/todo-schema";
import Database from "../database/sqlite-client";

/**
 * SQLite Todo Repository Implementation
 * @summary
 * Implementation of the TodoRepository interface using SQLite database.
 * This implementation contains ONLY the methods defined in the TodoRepository interface.
 * 
 * @implements {TodoRepository}
 */
class TodoSQLiteRepositoryImpl implements TodoRepository {

    /**
     * Ensures database is initialized before operations
     * @private
     */
    private async ensureDbInit(): Promise<void> {
        await Database.init();
    }

    /**
     * Creates a new todo item in SQLite database
     * @param {TodoEntity} todo - The todo entity to create
     * @returns {Promise<void>}
     */
    async createTodo(todo: TodoEntity): Promise<void> {
        await this.ensureDbInit();
        const db = Database.getDb();
        const record = TodoMapper.toRecord(todo);

        await db.runAsync(
            `INSERT INTO todos (id, title, category, date, time, notes, is_completed) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                record.id,
                record.title,
                record.category,
                record.date,
                record.time,
                record.notes,
                record.is_completed
            ]
        );
    }

    /**
     * Retrieves all todo items from SQLite database
     * @returns {Promise<TodoEntity[]>} Array of all todos ordered by creation date (newest first)
     */
    async fetchAllTodos(): Promise<TodoEntity[]> {
        await this.ensureDbInit();
        const db = Database.getDb();

        const records = await db.getAllAsync(
            'SELECT * FROM todos ORDER BY created_at DESC'
        ) as TodoRecord[];

        return records.map(record => TodoMapper.toEntity(record));
    }

    /**
     * Deletes a todo item by ID from SQLite database
     * @param {string} id - The ID of the todo to delete
     * @returns {Promise<void>}
     */
    async deleteTodo(id: string): Promise<void> {
        await this.ensureDbInit();
        const db = Database.getDb();

        await db.runAsync('DELETE FROM todos WHERE id = ?', [id]);
    }

    /**
     * Updates the completion status of a todo item in SQLite database
     * @param {string} id - The ID of the todo to update
     * @param {boolean} isCompleted - The new completion status
     * @returns {Promise<void>}
     */
    async updateTodoStatus(id: string, isCompleted: boolean): Promise<void> {
        await this.ensureDbInit();
        const db = Database.getDb();

        await db.runAsync(
            'UPDATE todos SET is_completed = ? WHERE id = ?',
            [isCompleted ? 1 : 0, id]
        );
    }
}

export default TodoSQLiteRepositoryImpl;