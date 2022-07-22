import { createContext, useReducer } from "react"
import { projectInitialState, projectsReducer } from "./reducer"

export const ProjectContext = createContext({} as ProjectContext)

export const ProjectProvider: React.FC = ({ children }) => {
  const [projectState, projectDispatch] = useReducer(projectsReducer, projectInitialState)
  
  return (
    <ProjectContext.Provider value={{ projectState, projectDispatch }}>
      { children }
    </ProjectContext.Provider>
  )
}
