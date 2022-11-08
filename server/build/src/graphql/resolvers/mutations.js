"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const database_1 = require("../../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcryptjs"));
const resolversMiddlewares_1 = require("../middlewares/resolversMiddlewares");
require('dotenv').config();
const { JWT_SECRET } = process.env;
exports.Mutation = {
    createProject: (parent, args) => {
        return database_1.prisma.projects.create({
            data: {
                description: args.description,
                name: args.name,
                deadline: args.deadline,
                createdAt: args.createdAt,
            },
        });
    },
    updateProject: (parent, args) => {
        return database_1.prisma.projects.update({
            where: { id: Number(args.id) },
            data: {
                description: args.description !== null ? args.description : undefined,
                name: args.name !== null ? args.name : undefined,
                deadline: args.deadline !== null ? args.deadline : undefined,
            },
        });
    },
    deleteProject: (parent, args) => {
        //A FAIRE Supression en cascade
        return database_1.prisma.projects.delete({
            where: {
                id: Number(args.id),
            },
        });
    },
    createUser: async (parent, args) => {
        const password = await cryptagePassword(args.password);
        async function cryptagePassword(password) {
            const salt = await bcrypt.genSalt();
            const passwordHashed = await bcrypt.hash(password, salt);
            return passwordHashed;
        }
        return database_1.prisma.users.create({
            data: {
                firstname: args.firstname,
                lastname: args.lastname,
                password: password,
                tel: args.tel,
                email: args.email,
            },
        });
    },
    updateUser: async (parent, args, decodedToken) => {
        (0, resolversMiddlewares_1.checkToken)(decodedToken);
        const idUser = decodedToken.id;
        const idUserToUpdate = Number(args.id);
        const roleUser = decodedToken.role;
        if (idUser !== idUserToUpdate && roleUser !== 'ADMIN')
            throw new Error('UPDATE FORBIDDEN');
        const user = await database_1.prisma.users.findUnique({ where: { id: Number(args.id) } });
        if (!user)
            throw new Error('id invalid');
        const email = args.email ? await checkEmail(args.email) : user.email;
        const firstname = args.firstname ? args.firstname : user.firstname;
        const lastname = args.lastname ? args.lastname : user.lastname;
        const tel = args.tel ? args.tel : user.tel;
        async function checkEmail(emailToCheck) {
            const email = await database_1.prisma.users.findUnique({ where: { email: emailToCheck } });
            if (email)
                throw new Error('email déja utilisé');
            return args.email;
        }
        return database_1.prisma.users.update({
            where: { id: Number(args.id) },
            data: {
                firstname,
                lastname,
                email,
                tel,
            },
        });
    },
    deleteUser: (parent, args, decodedToken) => {
        (0, resolversMiddlewares_1.checkToken)(decodedToken);
        const idUser = decodedToken.id;
        const idUserToDelete = Number(args.id);
        const roleUser = decodedToken.role;
        if (idUser !== idUserToDelete && roleUser !== 'ADMIN')
            throw new Error('UPDATE FORBIDDEN');
        return database_1.prisma.users.delete({
            where: {
                id: Number(args.id),
            },
        });
    },
    login: async (parent, args) => {
        try {
            const user = await database_1.prisma.users.findUnique({ where: { email: args.email } });
            if (!user)
                throw new Error('No user with that email');
            const isValidPassword = await bcrypt.compare(args.password, user.password);
            if (!isValidPassword)
                throw new Error('Incorrect password');
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email,
                role: user.roles,
            }, JWT_SECRET, {
                expiresIn: '1d',
            });
            return { token, user };
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
