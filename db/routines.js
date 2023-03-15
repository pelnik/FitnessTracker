const { attachActivitiesToRoutines } = require('./activities');
const client = require('./client');

// *** addActivityToRoutine() from routine_activities.js needs
// to be completed before you can pass the tests in this file.

// Work on this file FOURTH

// create and returns the new routine
// ** this function needs to be completed first because other tests rely on it.
async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      INSERT INTO routines ("creatorId", "isPublic", name, goal)
      VALUES($1, $2, $3, $4)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `,
      [creatorId, isPublic, name, goal]
    );

    return routine;
  } catch (error) {
    console.error('error creating routine');
    throw error;
  }
}

// this function returns an array of all of the routines with their
// activities attached. Use the helper function attachActivitiesToRoutines()
// from "db/activities" to help with this.
async function getAllRoutines() {
  try {
    const { rows } = await client.query(`
      SELECT r.*, u.username As "creatorName"
      FROM routines r
      JOIN users u
      on r."creatorId" = u.id;
    `);

    const attachedRows = await attachActivitiesToRoutines(rows);

    return attachedRows;
  } catch (error) {
    console.error('error getting all routines');
    throw error;
  }
}

// this function returns an array of all of the public routines with
//their activities attached. Use the helper function attachActivitiesToRoutines()
//from "db/activities" to help with this.

async function getAllPublicRoutines() {
  try {
    const { rows } = await client.query(`
    SELECT r.*, u.username As "creatorName"
    FROM routines r
    JOIN users u
    on r."creatorId" = u.id
    WHERE "isPublic"= true;
  `);

    return await attachActivitiesToRoutines(rows);
  } catch (error) {
    console.error('error getting all public routines');
    throw error;
  }
}

// this function should return a single routine (object)
// from the database that matches the id that is passed in as an argument.
async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(`
      SELECT *
      FROM routines
      WHERE id=${id};
    `);

    return routine;
  } catch (error) {
    console.error('error getting routine by id');
    throw error;
  }
}

// this function returns an array of all of the routines WITHOUT their activities attached.
async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM routines;
    `);

    return rows;
  } catch (error) {
    console.error('error getting routines without activities');
    throw error;
  }
}

// this function should return an array of routines, with their activities attached,
//where the creatorName matches the name that is passed in as part of the argument.
//Use the helper function attachActivitiesToRoutines() from "db/activities" to help with this.
async function getAllRoutinesByUser({ username }) {
  try {
    const { rows } = await client.query(`
    SELECT r.*, u.username As "creatorName"
    FROM routines r
    JOIN users u
    on r."creatorId" = u.id
    WHERE u.username = '${username}';
  `);

    return await attachActivitiesToRoutines(rows);
  } catch (error) {
    console.error('error getting all routines by user');
    throw error;
  }
}

// this function should return an array of all public routines, with their activities attached, where the creatorName matches the name that is passed in as part of the argument. Use the helper function attachActivitiesToRoutines() from "db/activities" to help with this.
async function getPublicRoutinesByUser({ username }) {
  try {
    const { rows } = await client.query(`
      SELECT r.*, u.username As "creatorName"
      FROM routines r
      JOIN users u
      on r."creatorId" = u.id
      WHERE u.username = '${username}' AND "isPublic" = 'true'
    `);

    return await attachActivitiesToRoutines(rows);
  } catch (error) {
    console.error('error getting public routines by user');
    throw error;
  }
}

// this function should return an array of all routines, with their activities attached, contain the activity id that is passed in as part of the argument. Use the helper function attachActivitiesToRoutines() from "db/activities" to help with this.
async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows } = await client.query(`
      SELECT r.*, u.username As "creatorName"
      FROM routines r
      JOIN users u
      on r."creatorId" = u.id
      JOIN routine_activities ra
      on r.id = ra."routineId"
      WHERE "isPublic" = 'true' AND ra."activityId" = '${id}'
    `);

    const attachedRows = await attachActivitiesToRoutines(rows);
    return attachedRows;
  } catch (error) {
    console.error('error getting public routines by activity');
    throw error;
  }
}

// The id should not be changed
// You should be able to update the name, or the goal, or the isPublic status, or any combination of these three.
// return the updated routine
async function updateRoutine(fields = {}) {
  const id = fields.id;
  delete fields.id;
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(', ');

  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      UPDATE routines
      SET ${setString}
      WHERE id = ${id}
      RETURNING *;
      `,
      Object.values(fields)
    );

    return routine;
  } catch (error) {
    console.error('error updating routine');
    throw error;
  }
}

// this should remove a routine from the database based upon the id that is passed in as an argument
// Make sure to delete all the routine_activities whose routine is the one being deleted.
// you do not need to return anything
async function destroyRoutine(id) {
  try {
    await client.query(`

      DELETE FROM routine_activities
      WHERE "routineId"=${id}; 
    
      DELETE FROM routines
      WHERE id=${id};
      
    `);
  } catch (error) {
    console.error('error deleting routine');
    throw error;
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
