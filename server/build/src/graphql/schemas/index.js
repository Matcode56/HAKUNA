"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) `
  type Notifications {
    id: ID!
    description: String!
    isRead: Boolean
    createdAt: String
    user_id: Users
    task_id: Tasks
    project_id: Projects
  }

  type Projects {
    id: ID!
    description: String
    createdAt: String
    name: String
    deadline: String
    Notifications: [Notifications]
    Tasks: [Tasks]
    user_project: [user_project]
  }

  type Tasks {
    id: ID!
    description: String
    createdAt: String
    deadline: String
    done: Boolean
    name: String
    project_id: Projects
    Notifications: [Notifications]
    task_comments: [task_comments]
    task_logs: [task_logs]
    task_ressources: [task_ressources]
    user_task: [user_task]
  }

  type Users {
    id: ID!
    firstname: String
    lastname: String
    password: String
    email: String 
    tel: Int
    roles: String
    Notifications: [Notifications]
    task_comments: [task_comments]
    user_project: [user_project]
    user_task: [user_task]
  }


  type task_comments {
    id: ID!
    comment: String
    tasks_id: Tasks
    user_id: Users
  }

  type task_logs {
    id: ID!
    description: String
    createdAt: String
    tasks_id: Tasks
  }

  type task_ressources {
    id: ID!
    file: String
    createdAt: String
    tasks_id: Tasks
  }

  type user_project {
    id: ID!
    user_id: Users
    projects_id: Projects
  }

  type user_task {
    id: ID!
    user_id: Users
    task_id: Tasks
  }

  type login {
    token: String
    user: Users
  }

  enum RolesName {
    Admin
    PO
    Dev
  }

  type login {
    token: String
    user: Users
  }
  type Query {
    hello: String
    getProject(id: String): Projects
    getProjects: [Projects]
    getProjectsUser(user_id: String): [Projects]
    getUser(id: String): Users
    getUsers: [Users]
  }

  type Mutation {
    createProject(createdAt: String, description: String, name: String, deadline: String): Projects!
    createProjectNested(id: String, createdAt: String, description: String, name: String, deadline: String, user_project: String): Projects!
    updateProject(id: String, description: String, name: String, deadline: String): Projects!
    deleteProject(id: String): Projects!
    createUser(firstname: String, lastname: String, password: String, email: String, tel: Int): Users!
    updateUser(id: String,firstname: String, lastname: String, password: String, email: String, tel: Int): Users!
    deleteUser(id: String): Users!
    login(email: String, password: String): login
  }
`;
