import { readFileSync, existsSync } from 'fs'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import expressPlaygrond from 'graphql-playground-middleware-express'
import { MongoClient, Db } from 'mongodb'

import resolvers from './resolvers'

const typeDefs = readFileSync('./typeDefs.graphql', 'utf-8')


// load environment from .env.json
if (existsSync('../.env.json') && !process.env.DB_HOST) {
  const envFile = JSON.parse(readFileSync('../.env.json').toString())
  if (!envFile.DB_HOST) {
    throw new Error('Error in DB_HOST env')
  }
  process.env['DB_HOST'] = envFile.DB_HOST
}


/*
 * Apollo GraphQL Express Server 
 */

async function start() {

  const app = express()

  const MONGO_DB = process.env.DB_HOST as string
  const client = await MongoClient.connect(
    MONGO_DB,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  const db = client.db()

  // build index for search...this needs to be moved to script eventually
  db.collection('files').createIndex({ name: "text", description: "text" })

  const context: { db: Db } = { db }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
  })

  server.applyMiddleware({ app })

  app.get('/', (req, res) => res.end('Welcome to the Photo Upload API'))
  app.get('/playground', expressPlaygrond({ endpoint: '/graphql' }))


  app.listen({ port: 4000 }, () => console.log(`GraphQL Server running @ http://localhost:4000${server.graphqlPath}`))
}

start().catch(e => { throw new Error(`Problem with start function: ${e}`) })
