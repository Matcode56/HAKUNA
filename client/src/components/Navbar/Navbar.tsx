import { useContext } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { UsersContext } from '../../hooks/users/context'
import decode from 'jwt-decode'

export const Navigation = () => {
  const { usersState, usersDispatch } = useContext(UsersContext)
  const navigate = useNavigate()

  // const token: Token = decode(localStorage.getItem('token')!)
  // console.log(token)

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
                className='absolute top-5 right-20 text-right bg-lavender text-white px-5 py-1 rounded-xl drop-shadow-md'
                onClick={() => {
                  localStorage.removeItem('token')
                  usersDispatch({ type: 'LOGOUT' })
                  navigate('/')
                }}
              >
                Se déconnecter
              </button>
            ) : (
              <button className='absolute top-5 right-20 text-right bg-lavender text-white px-5 py-1 rounded-xl drop-shadow-md'>
                <Link to='/' data-testid='Projects'>
                  Se connecter
                </Link>
              </button>
            )}
          </div>
          <img src='/icons/HakunaLogo.png' alt='logo' className='fixed w-40' />
          <nav className='bg-transparent  border-l-8 border-lavender h-screen flex flex-col justify-center fixed'>
            <ul>
              <li className='bg-lavender rounded-3xl -ml-4 flex justify-end pr-3 py-1 px-5 mb-20'>
                <NavLink to='/home' data-testid='Home'>
                  <img src='/icons/home.svg' alt='' />
                </NavLink>
              </li>
              {usersState.role !== 'DEV' && (
                <li className='bg-lavender rounded-3xl -ml-4 flex justify-end pr-3 py-1 px-5 mb-20'>
                  <NavLink to='/projects' data-testid='Projects'>
                    <img src='/icons/projects.svg' alt='' />
                  </NavLink>
                </li>
              )}
              <li className='bg-lavender rounded-3xl -ml-4 flex justify-end pr-3 py-1 px-5 mb-20'>
                <NavLink to='/profile' data-testid='Profile'>
                  <img src='/icons/userProfile.svg' alt='' />
                </NavLink>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  )
}
