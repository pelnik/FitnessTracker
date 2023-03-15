const express = require("express");
const routineActivitiesRouter = express.Router();
const { requireUser } = require("./utils");
const {
  updateRoutineActivity,
  canEditRoutineActivity,
  destroyRoutineActivity,
} = require("../db");

// PATCH /api/routine_activities/:routineActivityId
routineActivitiesRouter.patch(
  "/:routineActivityId",
  requireUser,
  async (req, res, next) => {
    let { routineActivityId } = req.params;
    routineActivityId = Number(routineActivityId);
    const id = routineActivityId;
    const userId = req.user.id;
    const { count, duration } = req.body;
    try {
      const canEdit = await canEditRoutineActivity(routineActivityId, userId);

      if (canEdit) {
        const updatedRoutine = await updateRoutineActivity({
          id,
          count,
          duration,
        });

        res.send(updatedRoutine);
      } else {
        next({
          name: "NotTheCreator",
          message: "You cannot update routine activity that you did not create",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

// DELETE /api/routine_activities/:routineActivityId
routineActivitiesRouter.delete(
  "/:routineActivityId",
  requireUser,
  async (req, res, next) => {
    let { routineActivityId } = req.params;
    routineActivityId = Number(routineActivityId);
    const id = routineActivityId;
    try {
      const canEdit = await canEditRoutineActivity(
        routineActivityId,
        req.user.id
      );

      if (canEdit) {
        const deletedActivity = await destroyRoutineActivity(id);
        res.send(deletedActivity);
      } else {
        next({
          name: "NotTheCreator",
          message: "You cannot update routine activity that you did not create",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = routineActivitiesRouter;
