/* 

DO NOT CHANGE THIS FILE

*/

require("dotenv").config()

const client = require('../../db/client');

const {
  getAllActivities,
  createActivity,
  updateActivity,
  getActivityById,
  getActivityByName,
} = require("../../db");

describe("DB Activities", () => {
  describe("createActivity({ name, description })", () => {
    it("Creates and returns the new activity (object)", async () => {
      const activityToCreate = {
        name: "Marathon",
        description: "Run all the miles",
      };
      const createdActivity = await createActivity(activityToCreate);

      expect(createdActivity.name).toBe(activityToCreate.name);
      expect(createdActivity.description).toBe(activityToCreate.description);
    });
  });



  // describe("getAllActivities()", () => {
  //   // it("selects and returns an array of all activities", async () => {
  //   //   await createFakeActivity("Sit ups", "Do 100 reps");
  //   //   const activities = await getAllActivities();
  //   //   const { rows: activitiesFromDatabase } = await client.query(`
  //   //     SELECT * FROM activities;
  //   //   `);
  //   //   expect(activities).toEqual(activitiesFromDatabase);
  //   // });
  // });


})