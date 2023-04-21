import DatabaseClient from './handlers/Database/DatabaseClient'

const database = new DatabaseClient({ type: "sqlite3" })
console.log(database.initalise())