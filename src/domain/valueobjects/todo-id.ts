/**
 * Todo Identifier Value Object
 * @summary
 * This class represents a unique identifier for a Todo item.
 * It generates a UUID v4 string upon instantiation.
 */
class TodoId {
    private readonly id: string;

    constructor() {
        this.id = this.generateId();
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