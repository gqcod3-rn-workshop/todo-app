/**
 * Todo Identifier Value Object
 * @summary
 * This class represents a unique identifier for a Todo item.
 * It can either generate a new UUID v4 string or use an existing one.
 */
class TodoId {
    private readonly id: string;

    /**
     * Constructor for TodoId
     * @param existingId - Optional existing ID to use. If not provided, generates a new UUID
     */
    constructor(existingId?: string) {
        this.id = existingId || this.generateId();
    }

    /**
     * Generates a UUID v4 string
     * @summary
     * Uses a custom implementation to generate a UUID v4 string.
     * @returns A UUID v4 string
     */
    private generateId(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public getValue(): string {
        return this.id;
    }
}

export default TodoId;