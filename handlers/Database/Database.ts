import { config } from 'config.json'



class Database extends  {
  constructor(params) {
    super()
    this.type = params.databaseType
    let serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);



    if (config.database) { console.log('Database Connected') } // connect to the database
  }

  initalise() {
    return this.type
  }
}
export { DatabaseClient }