/**
 * UUID Generator Utility
 * @summary
 * Provides UUID generation functionality that works in React Native environment.
 * Since crypto.randomUUID() is not available in React Native, we implement
 * a custom UUID v4 generator using Math.random().
 */

/**
 * Generates a UUID v4 compatible string
 * @returns A UUID v4 string in the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Alternative UUID generator using timestamp and random values
 * @returns A unique string identifier
 */
export function generateSimpleId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Default UUID generator (uses generateUUID)
 */
export const createId = generateUUID;