/// <reference types="react-scripts" />

/* Projects */

interface Project {
  id
  name: string
  description: string
  deadline
  createdAt
}

interface ProjectAction {
  type: string
  payload: Project[]
  payloadId: number
  payloadUpdate: any
  payloadCreate: any
  payloadInput: string
}

interface ProjectContext {
  projectState: Project[]
  projectDispatch: Dispatch<ProjectAction>
}

/* Users */

interface Users {
  id?
  firstname?: string
  lastname?: string
  email: string
  password?: string
  tel?: number
  roles: string
}

interface Token {
  id: number
  email: string
  exp: number
  iat: number
  role: string
}

interface UsersAction {
  type: string
  payload: Users
  payloadLogin: string
  payloadInput: string
  payloadMail: string
  payloadRoles: string
}

interface UsersContext {
  usersState: Users[]
  usersDispatch: Dispatch<UsersAction>
}
