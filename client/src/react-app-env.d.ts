/// <reference types="react-scripts" />

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
}

interface ProjectContext {
  projectState: Project[]
  projectDispatch: Dispatch<ProjectAction>
}