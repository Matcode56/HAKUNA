"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const schemas_1 = require("./graphql/schemas");
const resolvers_1 = require("./graphql/resolvers");
const http_1 = __importDefault(require("http"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config({ path: '../.env' });
const { JWT_SECRET } = process.env;
const checkToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (token) {
            const tokenVERIFY = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            return tokenVERIFY;
        }
        return null;
    }
    catch (error) {
        return null;
    }
});
const startApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: schemas_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        csrfPrevention: true,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            const decodedToken = checkToken(token);
            return decodedToken;
        },
    });
    yield server.start();
    const corsOptions = {
        origin: ['http://localhost:5000', 'https://studio.apollographql.com', 'http://localhost:3000'],
        credentials: true,
    };
    server.applyMiddleware({
        app,
        cors: corsOptions,
        path: '/graphql',
    });
    yield new Promise(resolve => httpServer.listen({ port: 5000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath} 🚀`);
    return { server, app };
});
startApolloServer();
