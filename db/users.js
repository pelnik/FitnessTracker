const client = require("./client");

// Work on this file FIRST

// user functions

// create and returns the new user
// ** this function needs to be completed first because other tests rely on it. 
async function createUser({ username, password }) {
  
}



// this function should return a single user (object) from the database that matches the userName that is passed in as an argument. 
async function getUserByUsernameWithPassword(userName) {

}



// this should be able to verify the password against the hashed password and if the passwords match then it should return a single user (object) from the database that matches the username that is passed in as part of the argument
async function getUser({ username, password }) {

}



// this function should return a single user (object) from the database that matches the id that is passed in as an argument.
async function getUserById(userId) {

}



module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsernameWithPassword,
}
