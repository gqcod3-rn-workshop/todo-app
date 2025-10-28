import * as SQLite from 'expo-sqlite';

/**
 * SQLite Database Client
 * @summary
 * This class provides a singleton SQLite database client. It ensures that the database
 * is initialized only once and provides methods to get the database instance.
 */
class Database {
    /**
     * Database instance
     */
    private static db: SQLite.SQLiteDatabase | null = null;
    
    /**
     * Initialize database and create tables
     */
    static async init(): Promise<void> {
        if (!this.db) {
            this.db = await SQLite.openDatabaseAsync('todos.db');
            await this.createTables();
        }
    }

    /**
     * Create todos table
     */
    private static async createTables(): Promise<void> {
        await this.db!.execAsync(`
            CREATE TABLE IF NOT EXISTS todos (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                date TEXT NOT NULL,
                time TEXT NOT NULL,
                notes TEXT,
                is_completed INTEGER DEFAULT 0,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }

    /**
     * Get database instance
     */
    static getDb(): SQLite.SQLiteDatabase {
        if (!this.db) {
            throw new Error('Database not initialized');
        }
        return this.db;
    }
}

export default Database;