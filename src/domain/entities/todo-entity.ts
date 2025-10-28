import Category from "../valueobjects/category";
import TodoId from "../valueobjects/todo-id";

/**
 * Todo Entity
 * @summary
 * This class represents a Todo task entity with properties such as id, title, category, date, time, notes, and completion status.
 * 
 * @property {TodoId} id - Unique identifier for the todo task.
 * @property {string} title - Title of the todo task.
 * @property {Category} category - Category of the todo task.
 * @property {Date} date - Date associated with the todo task.
 * @property {Date} time - Time associated with the todo task.
 * @property {string} [notes] - Optional notes or description for the todo task.
 * @property {boolean} isCompleted - Status indicating whether the todo task is completed. 
*/
class TodoEntity {
    readonly id: TodoId;
    readonly title: string;
    readonly category: Category;
    readonly date: Date;
    readonly time: Date;
    readonly notes?: string;
    readonly isCompleted: boolean;

    /**
     * Constructor for TodoEntity
     * @param {Object} params - Parameters for creating a TodoEntity
     */
    constructor(
        {
            id,
            title,
            category,
            date,
            time,
            notes,
            isCompleted = false
        }: {
            id?: string;
            title: string;
            category: Category;
            date: Date;
            time: Date;
            notes?: string;
            isCompleted?: boolean;
        }) {

        this.id = new TodoId(id);
        this.title = title;
        this.category = category;
        this.date = date;
        this.time = time;
        this.notes = notes;
        this.isCompleted = isCompleted;
    }

    /**
     * Creates a TodoEntity from raw data
     * @param {Object} params - Parameters for creating a TodoEntity.
     * @returns {TodoEntity} New TodoEntity instance
     */
    static fromRaw({
        title,
        category,
        date,
        time,
        notes,
        isCompleted = false
    }: {
        title: string;
        category: 'task' | 'event' | 'goal';
        date: Date;
        time: Date;
        notes?: string;
        isCompleted?: boolean;
    }): TodoEntity {
        const categoryEnum = this.stringToCategory(category);

        return new TodoEntity({
            title,
            category: categoryEnum,
            date,
            time,
            notes,
            isCompleted
        });
    }

    /**
     * Converts string category to Category enum
     * @param {string} category - String category value
     * @returns {Category} Category enum value
     * @static
     */
    static stringToCategory(category: 'task' | 'event' | 'goal'): Category {
        switch (category) {
            case 'task':
                return Category.Task;
            case 'event':
                return Category.Event;
            case 'goal':
                return Category.Goal;
            default:
                throw new Error(`Invalid category: ${category}`);
        }
    }

    /**
     * Converts Category enum to string
     * @param {Category} category - Category enum value
     * @returns {string} String category value
     * @static
     */
    static categoryToString(category: Category): 'task' | 'event' | 'goal' {
        switch (category) {
            case Category.Task:
                return 'task';
            case Category.Event:
                return 'event';
            case Category.Goal:
                return 'goal';
            default:
                throw new Error(`Invalid category enum: ${category}`);
        }
    }

    /**
     * Gets the category as string
     * @returns {string} Category as string
     */
    getCategoryAsString(): 'task' | 'event' | 'goal' {
        return TodoEntity.categoryToString(this.category);
    }

    /**
     * Gets the ID as string
     * @returns {string} ID as string
     */
    getIdAsString(): string {
        return this.id.getValue();
    }
}

export default TodoEntity;