"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const schemas_1 = require("../schemas");
const _1 = require(".");
const http_1 = __importDefault(require("http"));
it("returns all projects", async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: schemas_1.typeDefs,
        resolvers: _1.resolvers,
        csrfPrevention: true,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    const result = await server.executeOperation({
        query: 'query GetProject {getProjects {id name description createdAt deadline}}'
    });
    expect(result.errors).toBeUndefined();
    expect(result.data?.getProjects).toBeInstanceOf(Array);
});
