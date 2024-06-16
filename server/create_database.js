import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Read the SQL schema from the file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.join(__dirname, 'generate_database.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');
// const schema = fs.readFileSync(./server/generate_database.sql, 'utf-8');

// Connect to the database (will create a new file if it doesn't exist)
const dbPath = path.join(__dirname, 'meme_game.sqlite');
export const db = new sqlite3.Database(dbPath, 
    (err) => { if (err) throw err; 
});

db.serialize(() => {
  // Execute the schema
  db.exec(schema, (err) => {
    if (err) {
      console.error('Error executing SQL schema', err);
    } else {
      console.log('Database created successfully');
    }
  });
});

// Close the database connection
// db.close();
