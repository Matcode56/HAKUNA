import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { typeDefs } from "./graphql/schemas";
import { resolvers } from "./graphql/resolvers";
import http from "http";

const startApolloServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const corsOptions = {
    origin: [
      "http://localhost:8000",
      "https://studio.apollographql.com",
      "http://localhost:3000",
    ],
    credentials: true,
  };

  server.applyMiddleware({
    app,
    cors: corsOptions,
    path: "/graphql",
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 8000 }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:8000${server.graphqlPath} 🚀`
  );

  return { server, app };
};

startApolloServer();
