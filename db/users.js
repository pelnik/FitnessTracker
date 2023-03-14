const client = require('./client');

const bcrypt = require('bcrypt');

// Work on this file FIRST

// user functions

// create and returns the new user
// ** this function needs to be completed first because other tests rely on it.
async function createUser({ username, password }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password)
      VALUES($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username;
    `,
      [username, hashedPassword]
    );

    return user;
  } catch (error) {
    console.error('error creating user');
    throw error;
  }
}

// this function should return a single user (object) from the database that matches the userName that is passed in as an argument.
async function getUserByUsernameWithPassword(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
    `,
      [userName]
    );

    return user;
  } catch (error) {
    console.error('error getting user by username');
    throw error;
  }
}

// this should be able to verify the password against the hashed password
// and if the passwords match then it
// should return a single user (object) from the database that matches the
// username that is passed in as part of the argument
async function getUser({ username, password }) {
  try {
    const user = await getUserByUsernameWithPassword(username);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);

    delete user.password;

    if (isValid) {
      return user;
    }

    return null;
  } catch (error) {
    console.error('error getting user');
    throw error;
  }
}

// this function should return a single user (object) from the database
// that matches the id that is passed in as an argument.
async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT id, username
      FROM users
      WHERE id = ${userId};
    `);

    return user;
  } catch (error) {
    console.error(`error getting user by id`);
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsernameWithPassword,
};
