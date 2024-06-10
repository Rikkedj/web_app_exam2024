const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Read the SQL schema from the file
const schemaPath = path.join(__dirname, 'generate_database.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

// Connect to the database (will create a new file if it doesn't exist)
const dbPath = path.join(__dirname, 'meme_game.sqlite');
const db = new sqlite3.Database(dbPath, 
    (err) => { if (err) throw err; });

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
db.close();
