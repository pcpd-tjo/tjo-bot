class provider {
  constructor(parameters) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://test-database-default-rtdb.firebaseio.com",
    });
    this.database = admin.database();
  }
}


export { provider }