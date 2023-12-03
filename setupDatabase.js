/* eslint-disable no-undef */
let dbLoaded = false;
var db;
const init = () => {
    if (!dbLoaded) {
        var admin = require("firebase-admin");
        admin.initializeApp({
            credential: admin.credential.cert(
                JSON.parse(process.env.SERVICE_ACCOUNT)
            ),
            databaseURL: "https://tjo-database-365a3-default-rtdb.firebaseio.com"
        })
    
        db = admin.database();
    
    }
    return db;
}

module.exports = init;