import{ db } from './create_database.mjs';
import crypto from 'crypto';
import { getUser } from './user-dao.mjs'; // Adjust the path as necessary

const seedDb = async (db) => {
    const email = 'test@example.com';
    const password = 'password123';
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto.scryptSync(password, salt, 32).toString('hex');
  
    const userExists = await db.get('SELECT * FROM user WHERE email = ?', [email]);
  
    if (!userExists) {
      await db.run('INSERT INTO user (email, password, salt, name) VALUES (?, ?, ?, ?)', [email, hashedPassword, salt, 'Test User']);
      console.log('Test user created.');
    } else {
      console.log('Test user already exists.');
    }
  };

// Test the getUser function
const testGetUser = async () => {
    const db = await initDb();
    await seedDb(db);
  
    // Test cases
    const testCases = [
      { email: 'test@example.com', password: 'password123', expected: true },
      { email: 'test@example.com', password: 'wrongpassword', expected: false },
      { email: 'nonexistent@example.com', password: 'password123', expected: false }
    ];
  
    for (const { email, password, expected } of testCases) {
      try {
        const result = await getUser(email, password);
        console.log(`Testing with email: ${email}, password: ${password}`);
        console.log('Expected:', expected, '| Result:', !!result);
        console.log(result ? result : 'User not found or wrong password');
      } catch (err) {
        console.error('Error:', err);
      }
      console.log('------');
    }
  };
  
  testGetUser();