/* eslint-disable no-restricted-globals */
import { useContext, useEffect } from 'react'
import { UsersContext } from './hooks/users/context'

export const App = () => {
  const { usersDispatch } = useContext(UsersContext)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      usersDispatch({ type: 'LOGIN', input: 'login' })
    } else {
      document.location.href = '/'
    }
  }, [])

  return (
    <div className='flex justify-center pt-10'>
      <h1>Accueil</h1>
    </div>
  )
}
