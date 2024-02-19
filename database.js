/* eslint-disable no-undef */
const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    databaseURL: "https://tjo-database-365a3-default-rtdb.firebaseio.com",
};

const app = initializeApp(process.env.SERVICE_ACCOUNT);

const database = getDatabase(app);

module.exports = {
    db: database
};

