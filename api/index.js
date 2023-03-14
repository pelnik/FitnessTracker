const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  console.log('entering get user info', auth);

  if (!auth) {
    console.log('!auth');
    next();
  } else if (auth.startsWith(prefix)) {
    console.log('prefix');
    const token = auth.slice(prefix.length);

    console.log('token', token);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      console.log('id', id);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ message, name }) {
      next({ message, name });
    }
  } else {
    console.log('invalid');
    next({
      name: 'InvalidPrefix',
      message: 'Authorization must start with prefix',
    });
  }
});

// GET /api/health
router.get('/health', async (req, res, next) => {
  res.send({
    message: 'All is well',
  });
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/activities
const activitiesRouter = require('./activities');
router.use('/activities', activitiesRouter);

// ROUTER: /api/routines
const routinesRouter = require('./routines');
router.use('/routines', routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities');
router.use('/routine_activities', routineActivitiesRouter);

router.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = router;
