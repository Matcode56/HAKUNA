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
  firstname?: string | any
  lastname?: string | any
  email: string | any
  password?: string | any
  confirmPassword?: string | any
  tel?: number | string | any
  role?: string | any
  isConnected: boolean
}

interface Token {
  id?: number
  email?: string
  exp?: number
  iat?: number
  role?: string
}

interface UsersAction {
  type: string
  payload: string
  input: string
  payloadLogin: string
  payloadInput: string
  payloadMail: string
  payloadRoles: string
  confirm: string
}

interface UsersContext {
  usersState: Users
  usersDispatch: Dispatch<UsersAction>
}

/* Routes */
interface ProtectedRoute {
  role: string | undefined
  // children: React.ReactNode
}
