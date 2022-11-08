import { useQuery } from '@apollo/client'
import { useState, useContext, useEffect } from 'react'
import decode from 'jwt-decode'
import { UsersContext } from '../../hooks/users/context'
import { GET_USER } from '../../Graphql/Queries'

export const Profile = () => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const token: Token = decode(localStorage.getItem('token')!)
  const tokenNotDecoded = localStorage.getItem('token')
  const idUser = token.id?.toString()
  console.log(idUser)
  const { data, error, loading } = useQuery(GET_USER, { variables: { id: idUser } })

  console.log(data)
  console.log(error)

  const { usersState, usersDispatch } = useContext(UsersContext)

  console.log(token)

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleMail = (event: { target: { value: string } }) => {
    if (!isValidEmail(event.target.value)) {
      console.log(usersState)
      setErrorMessage('Email is invalid')
    } else {
      setErrorMessage('')
    }

    setEmail(event.target.value)
  }

  //récupérer le token

  //Utiliser UseEffect pour récup l'utilisateur via la bdd (via son id)

  //Mettre les infos dans le placeholder

  //mettre les placeholder en value

  return (
    <>
      <h1 className='text-center text-3xl underline pt-4 '>User Profile</h1>
      <div className='flex justify-center ml-8'>
        <div className='container bg-white  py-20 mt-20 rounded-3xl shadow-xl w-4/5 px-12 grid h-screen'>
          <div className='flex justify-center place-items-center'>
            <div className='mr-20'>
              <img src='/icons/placeholderImage.png'></img>
            </div>
            <div>
              <form>
                <div className='grid grid-cols-2 auto-cols-max  w-full'>
                  <div className=''>
                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2 font-subtitle' htmlFor='firstname'>
                        Firstname
                      </label>
                      <input
                        className={
                          isDisabled
                            ? 'shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            : 'shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-400'
                        }
                        id='firstname'
                        type='text'
                        placeholder='Hakuna'
                        disabled={isDisabled}
                      />
                    </div>
                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2 font-subtitle' htmlFor='lastname'>
                        Lastname
                      </label>
                      <input
                        className={
                          isDisabled
                            ? 'shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            : 'shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-400'
                        }
                        id='lastname'
                        type='text'
                        placeholder='Matata'
                        disabled={isDisabled}
                      />
                    </div>
                  </div>
                  <div className='w-full ml-10'>
                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2 font-subtitle' htmlFor='email'>
                        Email
                      </label>
                      <input
                        className={
                          isDisabled
                            ? 'shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            : 'shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-400'
                        }
                        id='email'
                        type='email'
                        placeholder='Hakuna@dev.com'
                        disabled={isDisabled}
                        onChange={handleMail}
                      />
                      {errorMessage && <h2 style={{ color: 'red' }}>{errorMessage}</h2>}
                    </div>
                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2 font-subtitle' htmlFor='email'>
                        Phone
                      </label>
                      <input
                        className={
                          isDisabled
                            ? 'shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            : 'shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-400'
                        }
                        id='phone'
                        type='text'
                        placeholder='0700000001'
                        disabled={isDisabled}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className='text-center'>
            <button
              className='custom-buttons justify-self-center font-paragraph inline-block mr-4'
              type='button'
              onClick={() => setIsDisabled(!isDisabled)}
            >
              {isDisabled ? <p>Modify</p> : <p>Save</p>}
            </button>
            {isDisabled ? null : <p className='mx-auto mb-0 inline-block'>You can now modify your informations</p>}
          </div>
        </div>
      </div>
    </>
  )
}
