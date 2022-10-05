import { createContext, useReducer } from 'react'
import { usersInitialState, usersReducer } from './reducer'

export const UsersContext = createContext({} as UsersContext)

export const UsersProvider: React.FC = ({ children }) => {
  const [usersState, usersDispatch] = useReducer(usersReducer, usersInitialState)

  return <UsersContext.Provider value={{ usersState, usersDispatch }}>{children}</UsersContext.Provider>
}
