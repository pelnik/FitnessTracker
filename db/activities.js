const client = require("./client")

// database functions

// create and return the new activity
// ** this function needs to be completed first because other tests rely on it. 
async function createActivity({ name, description }) {

}


// this function returns an array of all of the activities
async function getAllActivities() {

}

async function getActivityByName(name) {

}

async function getActivityById(id) {
  
}

// The Id should not get changed
// You should be able to update the name, or the description, or name & description. 
// return the updated activity
async function updateActivity({ id, ...fields }) {

}

// select and return an array of all activities
async function attachActivitiesToRoutines(routines) {
}






module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
}
