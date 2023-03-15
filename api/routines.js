const express = require('express');
const routinesRouter = express.Router();
const { requireUser } = require('./utils');
const {
  getAllPublicRoutines,
  createRoutine,
  getRoutineById,
  updateRoutine,
  destroyRoutine,
  addActivityToRoutine,
} = require('../db');
const routineActivitiesRouter = require('./routineActivities');

// GET /api/routines
routinesRouter.get('/', async (req, res, next) => {
  try {
    const allRoutines = await getAllPublicRoutines();

    res.send(allRoutines);
  } catch ({ message, name }) {
    next({ name, message });
  }
});

// POST /api/routines
routinesRouter.post('/', requireUser, async (req, res, next) => {
  const { isPublic, name, goal } = req.body;
  const creatorId = req.user.id;

  try {
    const routine = await createRoutine({ creatorId, isPublic, name, goal });

    res.send(routine);
  } catch ({ message, name }) {
    next({ name, message });
  }
});

// PATCH /api/routines/:routineId
routinesRouter.patch('/:routineId', requireUser, async (req, res, next) => {
  const { routineId } = req.params;
  const id = Number(routineId);
  const { isPublic, name, goal } = req.body;

  try {
    const getRoutine = await getRoutineById(id);

    if (req.user.id === getRoutine.creatorId) {
      const updatedRoutine = await updateRoutine({
        id,
        isPublic,
        name,
        goal,
      });

      res.send(updatedRoutine);
    } else {
      next({
        name: 'CannotUpdateAnotherUserRoutine',
        message: 'Updates only allowed for routines you created',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE /api/routines/:routineId
routinesRouter.delete('/:routineId', requireUser, async (req, res, next) => {
  const { routineId } = req.params;
  const id = Number(routineId);

  try {
    const getRoutine = await getRoutineById(id);

    if (req.user.id === getRoutine.creatorId) {
      await destroyRoutine(id);

      res.send(getRoutine);
    } else {
      next({
        name: 'CannotDeleteAnotherUserRoutine',
        message: 'Deleting only allowed for routines you created',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/routines/:routineId/activities
routinesRouter.post('/:routineId/activities', async (req, res, next) => {
  let { routineId } = req.params;
  routineId = Number(routineId);
  const { activityId, count, duration } = req.body;

  try {
    const routine = await addActivityToRoutine({
      routineId,
      activityId,
      count,
      duration,
    });

    if (routine === undefined) {
      next({
        name: 'RoutineActivityAlreadyExists',
        message: 'This routine activity already exists',
      });
    } else {
      res.send(routine);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = routinesRouter;
