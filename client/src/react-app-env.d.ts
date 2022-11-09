/// <reference types="react-scripts" />

/* Projects */

export interface Project {
  id
  name: string
  description: string
  deadline
  createdAt
  owner_name: string
  project_owner: any
}

export interface ProjectAction {
  type: string
  payload: Project[]
  payloadId: number
  payloadUpdate: any
  payloadCreate: any
  payloadInput: string
  payloadUser: any
}

export interface ProjectContext {
  projectState: Project[]
  projectDispatch: Dispatch<ProjectAction>
}

/* Users */

export interface Users {
  id?
  firstname?: string | any
  lastname?: string | any
  email: string | any
  password?: string | any
  confirmPassword?: string | any
  tel?: number | string | any
  role?: string | any
  isConnected: boolean
}

export interface Token {
  id?: number
  email?: string
  exp?: number
  iat?: number
  role?: string
}

export interface UsersAction {
  type: string
  payload: string
  input: string
  payloadLogin: string
  payloadInput: string
  payloadMail: string
  payloadRoles: string
  confirm: string
}

export interface UsersContext {
  usersState: Users
  usersDispatch: Dispatch<UsersAction>
}

/* Routes */
export interface ProtectedRoute {
  role: string | undefined
  // children: React.ReactNode
}
