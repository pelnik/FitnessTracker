const express = require('express');
const {
  getAllActivities,
  getPublicRoutinesByActivity,
  getActivityById,
  createActivity,
  updateActivity,
  getActivityByName,
} = require('../db');
const { requireUser } = require('./utils.js');
const activitiesRouter = express.Router();

// GET /api/activities
activitiesRouter.get('/', async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();

    res.send(allActivities);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/activities/:activityId/routines
activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
  const { activityId } = req.params;
  try {
    const id = Number(activityId);
    const activity = await getActivityById(id);

    if (!activity) {
      next({
        name: 'ActivityNotExist',
        message: "Activity doesn't exist",
      });
    } else {
      const routines = await getPublicRoutinesByActivity({ id });

      res.send(routines);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/activities
activitiesRouter.post('/', requireUser, async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const makeActivity = await createActivity({ name, description });

    if (!makeActivity) {
      next({
        name: 'ActivityAlreadyExist',
        message: 'This activity already exists',
      });
    } else {
      res.send(makeActivity);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PATCH /api/activities/:activityId
activitiesRouter.patch('/:activityId', requireUser, async (req, res, next) => {
  const { activityId } = req.params;
  const id = Number(activityId);
  const { name, description } = req.body;

  console.log('name', name, 'description', description);
  try {
    const activity = await getActivityById(id);

    if (!activity) {
      next({
        name: 'ActivityNotExist',
        message: "Activity doesn't exist",
      });
    } else {
      const activityName = await getActivityByName(name);

      console.log('returned activity', activityName, 'returned id', id);

      if (activityName && activityName.id !== id) {
        next({
          name: 'NameAlreadyExist',
          message: 'Name already exists',
        });
      } else {
        const activityUpdate = await updateActivity({ id, name, description });
        res.send(activityUpdate);
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = activitiesRouter;
