//import sqlite3 from 'sqlite3';
//import { open } from 'sqlite';
import crypto from 'crypto';


// open the database


// Function to seed the database with a test user
const seedDb = async (db) => {
  const email = 'test@example.com';
  const password = 'password123';
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.scryptSync(password, salt, 32).toString('hex');
  const username = 'Test User';

  try {
    const userExists = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!userExists) {
      await db.run('INSERT INTO users (user_id, username, hashed_password, email) VALUES (?, ?, ?, ?)', ['2', username, hashedPassword, email]);
      console.log('Test user created.');
    } else {
      console.log('Test user already exists.');
    }
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

// Get user from the database by email
export const getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], (err, row) => {
      if (err) { 
        reject(err); 
      }
      else if (row === undefined) { 
        resolve(false); 
      }
      else {
        const user = {id: row.user_id, username: row.username, email: row.email};
        
        crypto.scrypt(password, row.salt, 32, function(err, hashedPassword) {
          if (err) reject(err);
          if(!crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword))
            resolve(false);
          else
            resolve(user);
        });
      }
    });
  });
};
/*
// Function to get user
const getUser = async (db, email, password) => {
  try {
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return null;
    }
    const hashedPassword = crypto.scryptSync(password, user.salt, 32).toString('hex');
    if (hashedPassword === user.hashed_password) {
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Error getting user:', err);
    throw err;
  }
};
*/

// Test the getUser function
const testGetUser = async () => {
  // const db = await openDb();
  const db = await open({
    filename: 'server/meme_game.sqlite',
    driver: sqlite3.Database
  });
  await seedDb(db);

  // Test cases
  const testCases = [
    { email: 'test@example.com', password: 'password123', expected: true },
    { email: 'test@example.com', password: 'wrongpassword', expected: false },
    { email: 'nonexistent@example.com', password: 'password123', expected: false }
  ];

  for (const { email, password, expected } of testCases) {
    try {
      const result = await getUser(db, email, password);
      console.log(`Testing with email: ${email}, password: ${password}`);
      console.log('Expected:', expected, '| Result:', !!result);
      console.log(result ? result : 'User not found or wrong password');
    } catch (err) {
      console.error('Error:', err);
    }
    console.log('------');
  }

  await db.close();
};

testGetUser();
