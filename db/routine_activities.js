const client = require("./client");


// Work on addActivityToRoutine THIRD, then work on routines.js

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {}

// Work on the remainder of this file FIFTH

async function getRoutineActivityById(id) {}

async function getRoutineActivitiesByRoutine({ id }) {}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
