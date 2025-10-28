import TodoEntity from '@/src/domain/entities/todo-entity';

/**
 * Todo Record Interface
 */
export interface TodoRecord {
    id: string;
    title: string;
    category: string;
    date: string;
    time: string;
    notes: string | null;
    is_completed: number;
    created_at: string;
}

/**
 * Todo Mapper
 * @summary
 * This class provides methods to map between TodoEntity and TodoRecord.
 * 
 * @method toRecord - Static method to convert TodoEntity to TodoRecord
 * @method toEntity - Static method to convert TodoRecord to TodoEntity
 */
export class TodoMapper {

    /**
     * Convert entity to database record - Omit created_at
     * @param entity - The TodoEntity to convert
     * @returns {Omit<TodoRecord, 'created_at'>} TodoRecord without created_at
     */
    static toRecord(entity: TodoEntity): Omit<TodoRecord, 'created_at'> {
        return {
            id: entity.getIdAsString(),
            title: entity.title,
            category: entity.getCategoryAsString(),
            date: entity.date.toISOString().split('T')[0],
            time: entity.time.toISOString(),
            notes: entity.notes || null,
            is_completed: entity.isCompleted ? 1 : 0
        };
    }

    /**
     * Convert database record to entity
     * @param record - The TodoRecord to convert
     * @returns {TodoEntity} The converted TodoEntity
     */
    static toEntity(record: TodoRecord): TodoEntity {
        return new TodoEntity({
            id: record.id, // ✨ Ahora podemos pasar el ID existente directamente
            title: record.title,
            category: TodoEntity.stringToCategory(record.category as 'task' | 'event' | 'goal'),
            date: new Date(record.date),
            time: new Date(record.time),
            notes: record.notes || undefined,
            isCompleted: Boolean(record.is_completed)
        });
    }
}