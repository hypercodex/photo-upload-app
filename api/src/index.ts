import { readFileSync } from 'fs'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import expressPlayground from 'graphql-playground-middleware-express'

import resolvers from './resolvers'

const typeDefs = readFileSync('./_typeDefs.graphql', 'utf-8')

const app = express()

const server = new ApolloServer({
 typeDefs,
 resolvers
})

server.applyMiddleware({ app })

app.get('/', (req, res) => res.end('Welcome to the Photo Upload API'))
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))


app.listen({ port: 4000 }, () => console.log(`GraphQL Server running @ http://localhost:4000${server.graphqlPath}`))


