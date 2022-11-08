/* eslint-disable no-restricted-globals */
import { useContext, useEffect, useState } from 'react'
import { UsersContext } from './hooks/users/context'
import decode from 'jwt-decode'

export const App = () => {
  const [loading, setLoading] = useState(true)
  const { usersState, usersDispatch } = useContext(UsersContext)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      usersDispatch({ type: 'LOGIN', input: 'login' })
    } else {
      const url = window.location.href
      document.location.href = '/'
    }
  }, [])

  return (
    <div className='flex justify-center pt-10'>
      <h1>Accueil</h1>
    </div>
  )
}
