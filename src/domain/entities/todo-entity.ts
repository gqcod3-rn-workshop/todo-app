/**
 * Todo Entity
 * @summary
 * This class represents a Todo task entity with properties such as id, title, category, date, time, notes, and completion status.
 * 
 * @property {string} id - Unique identifier for the todo task.
 * @property {string} title - Title of the todo task.
 * @property {'task' | 'event' | 'goal'} category - Category of the todo task.
 * @property {Date} date - Date associated with the todo task.
 * @property {Date} time - Time associated with the todo task.
 * @property {string} [notes] - Optional notes or description for the todo task.
 * @property {boolean} isCompleted - Status indicating whether the todo task is completed. 
*/
class TodoEntity {
    readonly id: string;
    readonly title: string;
    readonly category: 'task' | 'event' | 'goal';
    readonly date: Date;
    readonly time: Date;
    readonly notes?: string;
    readonly isCompleted: boolean;

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
            id: string;
            title: string;
            category: 'task' | 'event' | 'goal';
            date: Date;
            time: Date;
            notes?: string;
            isCompleted?: boolean;
        }) {

        this.id = id;
        this.title = title;
        this.category = category;
        this.date = date;
        this.time = time;
        this.notes = notes;
        this.isCompleted = isCompleted;
    }
}

export default TodoEntity;