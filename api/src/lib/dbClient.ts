import { MongoClient, Db } from 'mongodb'

import loadSecrets from './loadSecrets'

async function dbClient(): Promise<Db> {

  // sets process.env.DB_HOST
  await loadSecrets()

  const MONGO_DB = process.env.DB_HOST as string
  const client = await MongoClient.connect(
    MONGO_DB,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  const db = client.db()
  db.collection('files').createIndex({ name: "text", description: "text" })
  return db
}

export default dbClient
