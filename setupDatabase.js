/* eslint-disable no-undef */
const init = () => {
    var admin = require("firebase-admin");
    admin.initializeApp({
        credential: admin.credential.cert(
            JSON.parse(process.env.SERVICE_ACCOUNT)
        ),
        databaseURL: "https://tjo-database-365a3-default-rtdb.firebaseio.com"
    })

    var db = admin.database();

    return db;
}

module.exports = init;