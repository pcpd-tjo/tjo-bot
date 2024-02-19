import firebase from 'firebase-admin';
const cert = firebase.credential.cert;
// eslint-disable-next-line no-undef
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT)
firebase.initializeApp({
    credential: cert(serviceAccount),
    databaseURL: 'https://tjo-database-365a3-default-rtdb.firebaseio.com'
});

async function queryReference(databaseReference) {
    return (databaseReference.once("value").then((snapshot) => {
        //console.log(databaseReference.ref, snapshot.val())
        return snapshot.val()
    }))
}

export const db = firebase.database;
export const query = queryReference;