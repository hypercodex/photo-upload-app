import path from 'path'
import { promises as fs } from 'fs'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import expressPlaygrond from 'graphql-playground-middleware-express'

import dbClient from './lib/dbClient'
import resolvers from './resolvers'



/*
 * Apollo GraphQL Express Server 
 */

async function start() {

  // get DB
  const db = await dbClient()
  const context = { db }

  // load schema, construct Apollo Server
  const typeDefs = await fs.readFile('./typeDefs.graphql', 'utf-8')
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
  })

  const app = express()
  server.applyMiddleware({ app })

  // handlers
  app.get('/', (req, res) => res.end('Welcome to the Photo Upload API'))
  app.get('/playground', expressPlaygrond({ endpoint: '/graphql' }))

  // file service
  app.use(
    '/uploads',
    express.static(path.join(__dirname, 'assets', 'uploads'))
  )

  app.listen(
    { port: 4000 },
    () => console.log(`GraphQL Server running @ http://localhost:4000${server.graphqlPath}`)
  )
}

start().catch((e: string) => {
  throw new Error(`Problem with start function: ${e}`)
})
