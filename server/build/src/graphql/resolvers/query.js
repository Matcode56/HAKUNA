"use strict";
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
    getProjectsUser: async (args) => {
        // const searchUserProjects= await prisma.user_project.findMany({
        //     where: {user_id: Number(args.user_id)}
        // })
        // const idUserProject= searchUserProjects.map((e)=>{
        //     return e.project_id
        // })
        return database_1.prisma.projects.findMany({
            where: { id: 3 },
        });
    },
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
