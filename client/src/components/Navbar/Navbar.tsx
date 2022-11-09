import { useContext, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { UsersContext } from '../../hooks/users/context'
import { Home, MultiplePages, TaskList, LogOut } from 'iconoir-react'
import decode from 'jwt-decode'
import { GET_USER } from '../../Graphql/Queries'
import { useQuery } from '@apollo/client'

export const Navigation = () => {
  const { usersState, usersDispatch } = useContext(UsersContext)
  const token: Token = decode(localStorage.getItem('token')!)
  const idUser = token.id?.toString()
  const { data, loading } = useQuery(GET_USER, { variables: { id: idUser } })
  const navigate = useNavigate()
  const currentPage = window.location.pathname

  return (
    <>
      {!usersState.isConnected ? (
        <div className='text-right'>
          <button className='absolute top-5 right-20 text-right bg-lavender text-white px-5 py-1 rounded-xl drop-shadow-md'>
            <Link to='/' data-testid='Projects'>
              Se connecter
            </Link>
          </button>
        </div>
      ) : (
        <>
          <div className='text-right'>
            {usersState.isConnected ? (
              <button
                className='connect-btn absolute top-5 right-20 text-right bg-lavender text-white px-5 py-1 rounded-xl drop-shadow-md'
                onClick={() => {
                  localStorage.removeItem('token')
                  usersDispatch({ type: 'LOGOUT' })
                  navigate('/')
                }}
              >
                <p>{loading === false && data && data.getUser.firstname}</p>
                <LogOut color={'white'} height={28} width={24} strokeWidth={2} />
              </button>
            ) : (
              <button className='connect-btn absolute top-5 right-20 text-right bg-lavender text-white px-5 py-1 rounded-xl drop-shadow-md'>
                <Link to='/' data-testid='Projects'>
                  Se connecter
                </Link>
              </button>
            )}
          </div>
          <img src='/icons/logo.png' alt='logo' className='fixed logo-nav' />
          <nav className='bg-transparent  border-l-8 border-lavender h-screen flex flex-col justify-center fixed'>
            <ul>
              <li
                className={`bg-lavender flex justify-end pr-3 py-1 px-5 mb-20 ${
                  currentPage === '/home' ? 'is-active' : ''
                }`}
              >
                <NavLink to='/home' data-testid='Home'>
                  <p>Home</p>
                  <Home color={currentPage === '/home' ? 'black' : 'white'} height={34} width={34} />
                </NavLink>
              </li>
              {usersState.role !== 'DEV' && (
                <li
                  className={`bg-lavender flex justify-end pr-3 py-1 px-5 mb-20 ${
                    currentPage === '/projects' ? 'is-active' : ''
                  }`}
                >
                  <NavLink to='/projects' data-testid='Projects'>
                    <p>Projects</p>
                    <TaskList color={currentPage === '/projects' ? 'black' : 'white'} height={34} width={34} />
                  </NavLink>
                </li>
              )}
              <li
                className={`bg-lavender flex justify-end pr-3 py-1 px-5 mb-20 ${
                  currentPage === '/profile' ? 'is-active' : ''
                }`}
              >
                <NavLink to='/profile' data-testid='Profile'>
                  <p>Users</p>
                  <MultiplePages color={currentPage === '/profile' ? 'black' : 'white'} height={34} width={34} />
                </NavLink>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  )
}
