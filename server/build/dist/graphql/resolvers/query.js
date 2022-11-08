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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const database_1 = require("../../database");
const resolversMiddlewares_1 = require("../middlewares/resolversMiddlewares");
exports.Query = {
    getProject: (parent, args) => {
        return database_1.prisma.projects.findUnique({
            where: { id: Number(args.id) },
        });
    },
    getProjects: () => {
        return database_1.prisma.projects.findMany();
    },
    getProjectsUser: (args) => __awaiter(void 0, void 0, void 0, function* () {
        // const searchUserProjects= await prisma.user_project.findMany({
        //     where: {user_id: Number(args.user_id)}
        // })
        // const idUserProject= searchUserProjects.map((e)=>{
        //     return e.project_id
        // })
        return database_1.prisma.projects.findMany({
            where: { id: 3 },
        });
    }),
    getUsers: (parents, args, decodedToken) => {
        (0, resolversMiddlewares_1.checkToken)(decodedToken);
        return database_1.prisma.users.findMany({ select: {
                email: true,
                firstname: true,
                lastname: true,
                roles: true,
                id: true
            } });
    },
    getUser: (parents, args, decodedToken) => {
        (0, resolversMiddlewares_1.checkToken)(decodedToken);
        return database_1.prisma.users.findUnique({ where: { id: Number(args.id) }, select: {
                email: true,
                firstname: true,
                lastname: true,
                roles: true,
                id: true
            } });
    }
};
