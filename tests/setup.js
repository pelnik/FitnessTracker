const { createTables, dropTables } = require('../db/seed');

const setup = async () => {
  console.log("--- JEST SETUP ---");
  await dropTables();
  await createTables();
}

module.exports = setup;