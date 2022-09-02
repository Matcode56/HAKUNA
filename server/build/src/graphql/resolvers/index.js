"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const query_1 = require("./query");
const mutations_1 = require("./mutations");
exports.resolvers = {
    Query: query_1.Query,
    Mutation: mutations_1.Mutation,
};
