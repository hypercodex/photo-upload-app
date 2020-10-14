import path from 'path'
import { promises as fs } from 'fs'
import type { Db } from 'mongodb'
import express, { Request, Response } from 'express'
import { ulid } from 'ulid'
import Cookies from 'cookies'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
// import expressPlaygrond from 'graphql-playground-middleware-express'

import dbClient from './lib/dbClient'
import resolvers from './resolvers'


/*
 * Apollo GraphQL Express Server 
 */


// All requests that mutate state are secured via double cookie submit
// see: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie

const keys: string[] = [
  process.env.KEY1 ? process.env.KEY1 : 'fallback0',
  process.env.KEY2 ? process.env.KEY2 : 'fallback1'
]

const authorize = async (req: Request, res: Response) => {
  const cookies = new Cookies(req, res, { keys: keys })
  // generate a token
  const token = ulid()
  // set token in signed cookie 
  cookies.set('authorization', token, {httpOnly: false, signed: true})
  // set token in header
  res.set('authorization', token)
  res.json({ token })
}


interface GetAuthContext {
  (req: any , res: any): { authorized: boolean, db: Db }
}

async function start() {

  // get DB
  const db = await dbClient()
  
  // graphql context authenticated context is a closure over the db client
  const getAuthContext: GetAuthContext = ({ req, res})  => {
    const cookies = new Cookies(req, res, {keys: keys} )
    const token = req.headers.authorization || ''
    if (!token) {
      console.log('MISSING HEADER NOT AUTHORIZED')
      return { authorized: false, db }
    }
    const cookieToken = cookies.get('authorization', { signed: true })
    if (!cookieToken || token !== cookieToken) {
      console.log('HANDLER NOT AUTHORIZED')
      return { authorized: false, db}
    }
    console.log('HANDLER AUTHORIZED')
    return { authorized: true, db}
  }

  // load schema, construct Apollo Server
  const typeDefs = await fs.readFile('./typeDefs.graphql', 'utf-8')
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: getAuthContext 
  })
  
  // create express app
  const app = express()
  
  // cookie-parser needed to bridge cookies into apollo
  app.use(cookieParser())

  // helment blocks graphql playground... 
  app.use(helmet())

  const corsOptions = {
    origin: [
      'http://localhost:3000',
    ],
    credentials: true
  }
  app.use(cors(corsOptions))

  // Welcome
  app.get('/', (req, res) => res.end('Welcome to the Photo Upload API'))
  app.get('/auth', authorize)

  server.applyMiddleware({ app, cors: corsOptions  })

  // file service
  console.log('File storage at:', path.join(__dirname, 'assets', 'uploads'))
  app.use(
    '/public',
    express.static(path.join(__dirname, '..', 'assets', 'uploads'))
  )

  app.listen(
    { port: 4000 },
    () => console.log(`GraphQL Server running @ http://localhost:4000${server.graphqlPath}`)
  )
}

start().catch((e: string) => {
  throw new Error(`Problem with start function: ${e}`)
})
