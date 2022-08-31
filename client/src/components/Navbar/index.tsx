/* eslint-disable no-restricted-globals */
import { Link } from 'react-router-dom'
import decode from 'jwt-decode'
import { useEffect, useState } from 'react'

export const Navigation = () => {
  const [token, setToken] = useState<Token>({})

  useEffect(() => {
    if (location.href === location.origin + '/') {
    } else {
      setToken(decode(localStorage.getItem('token')!))
    }
  }, [])

  return (
    <nav className='bg-transparent  border-l-8 border-lavender h-screen flex flex-col justify-center fixed'>
      <ul>
        {token.role === 'DEV' ? (
          <li className='bg-lavender rounded-3xl -ml-4 flex justify-end pr-3 py-1 px-5 mb-20'>
            <Link to='/home' data-testid='Home'>
              <img src='/icons/home.svg' alt='' />
            </Link>
          </li>
        ) : token.role === 'PO' || token.role === 'ADMIN' ? (
          <>
            <li className='bg-lavender rounded-3xl -ml-4 flex justify-end pr-3 py-1 px-5 mb-20'>
              <Link to='/home' data-testid='Home'>
                <img src='/icons/home.svg' alt='' />
              </Link>
            </li>
            <li className='bg-lavender rounded-3xl -ml-4 flex justify-end pr-3 py-1 px-5 mb-20'>
              <Link to='/projects' data-testid='Projects'>
                <img src='/icons/projects.svg' alt='' />
              </Link>
            </li>
          </>
        ) : (
          ''
        )}
      </ul>
    </nav>
  )
}
