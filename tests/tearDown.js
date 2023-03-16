const client = require('../db/client');

const tearDown = async ({ watch, watchAll }) => {
  if (watch || watchAll) {
    return;
  }
  console.log('Client Ended');
};

module.exports = tearDown;
