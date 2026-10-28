import fs from 'fs';
import path from 'path';
import { config } from '../config/config.js';
import { seedData } from './seedData.js';

class Storage {
  constructor() {
    this.filePath = config.dbFilePath;
    this.initDatabase();
  }

  initDatabase() {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (!fs.existsSync(this.filePath)) {
        fs.writeFileSync(this.filePath, JSON.stringify(seedData, null, 2), 'utf-8');
        console.log(`[Storage] Initialized database with seed data at: ${this.filePath}`);
      }
    } catch (error) {
      console.error('[Storage] Error initializing database:', error);
    }
  }

  read() {
    try {
      if (!fs.existsSync(this.filePath)) {
        this.initDatabase();
      }
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('[Storage] Failed to read database, returning default seed data:', error);
      return JSON.parse(JSON.stringify(seedData));
    }
  }

  write(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (error) {
      console.error('[Storage] Error writing to database:', error);
      return false;
    }
  }

  getTable(tableName) {
    const db = this.read();
    return db[tableName];
  }

  updateTable(tableName, updaterFn) {
    const db = this.read();
    const currentTableData = db[tableName];
    const updatedTableData = updaterFn(currentTableData);
    db[tableName] = updatedTableData;
    this.write(db);
    return updatedTableData;
  }

  reset() {
    this.write(seedData);
    return seedData;
  }
}

export const storage = new Storage();
