var Agenda = require('agenda');
var mongoose = require('mongoose');

var mongoConnectionString = "mongodb://localhost:27017/Basic-CRUD";

var agenda = new Agenda({
  db: {address: mongoConnectionString, collection: 'agendaJobs'}
});

agenda.define('check database connection', async job => {
  try {
    const state = mongoose.connection.readyState;
    if (state === 1) {
      console.log("Database connection is good.");
    } else {
      console.log("Database connection is not good.");
    }
  } catch (err) {
    console.error("Error checking database connection:", err);
  }
});

(async function () {
  await agenda.start();
  await agenda.every('1 minute', 'check database connection');
})();


module.exports = agenda;