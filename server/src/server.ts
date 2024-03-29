import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { typeDefs } from './graphql/schemas'
import { resolvers } from './graphql/resolvers'
import http from 'http'
import jwt from 'jsonwebtoken'

require('dotenv').config()
const { JWT_SECRET } = process.env

export const checkToken = async (token: string) => {
  try {
    if (token) {
      const tokenVERIFY = jwt.verify(token, JWT_SECRET)
      return tokenVERIFY
    }
    return null
  } catch (error) {
    return error
  }
}

const startApolloServer = async () => {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
      const token = req.headers.authorization.split(' ')[1]
      const decodedToken = checkToken(token)
      return decodedToken
    },
  })

  await server.start()

  const corsOptions = {
    origin: '*',
    credentials: true,
  }

  server.applyMiddleware({
    app,
    cors: corsOptions,
    path: '/graphql',
  })

  await new Promise<void>(resolve => httpServer.listen({ port: 5001 }, resolve))
  console.log(`🚀 Server ready at http://localhost:5001${server.graphqlPath} 🚀`)

  return { server, app }
}
startApolloServer()
