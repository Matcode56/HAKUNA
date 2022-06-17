import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { typeDefs } from "../schemas";
import { resolvers } from ".";
import http from "http";


it("returns all projects", async () => {
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


  const result = await server.executeOperation({
    query: 'query GetProject {getProjects {id name description createdAt deadline}}'
  })

  expect(result.errors).toBeUndefined();
  expect(result.data?.getProjects).toBeInstanceOf(Array)
});
