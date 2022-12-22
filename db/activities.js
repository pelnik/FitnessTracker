const client = require("./client")

// database functions

// create and return the new activity
// ** this function needs to be completed first because other tests rely on it. 
async function createActivity({ name, description }) {

}


// this function returns an array of all of the activities
async function getAllActivities() {

}

// this function should return a single activity (object) from the database that matches the name that is passed in as an argument. 
async function getActivityByName(name) {

}

// this function should return a single activity (object) from the database that matches the id that is passed in as an argument.
async function getActivityById(id) {
  
}

// The Id should not get changed
// You should be able to update the name, or the description, or name & description. 
// return the updated activity
async function updateActivity({ id, ...fields }) {

}



module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  createActivity,
  updateActivity,
}
