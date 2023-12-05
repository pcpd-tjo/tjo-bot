/* eslint-disable no-undef */
const init = () => {
    const { initializeApp } = require("firebase/app");
    const { getDatabase } = require("firebase/database");

    // See: https://firebase.google.com/docs/web/learn-more#config-object
    const firebaseConfig = {
        databaseURL: "https://tjo-database-365a3-default-rtdb.firebaseio.com",
    };

    const app = initializeApp(firebaseConfig);

    const database = getDatabase(app);
    
    return database;
}
module.exports = init;

