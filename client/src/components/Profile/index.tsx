import { useQuery, useMutation } from '@apollo/client'
import { useState, useContext, useEffect } from 'react'
import decode from 'jwt-decode'
import { UsersContext } from '../../hooks/users/context'
import { GET_USER } from '../../Graphql/Queries'
import { UPDATE_USER } from '../../Graphql/Mutations'

export const Profile = () => {
  const { usersState, usersDispatch } = useContext(UsersContext)
  const token: Token = decode(localStorage.getItem('token')!)
  const idUser = token.id?.toString()
  const { data, error, loading } = useQuery(GET_USER, { variables: { id: idUser } })
  const [baseData, setBaseData] = useState<any>({});
  useEffect(() => {
    console.log(usersState)
    if (loading === false && data && baseData) {
      setBaseData(data.getUser);
    }
  })
  const [isDisabled, setIsDisabled] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')



  console.log(loading)


  const [updateUser, { data: updatedData, error: updatedError, loading: updateLoading }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USER, variables: {id: idUser}}, 'getUser'],
  })



  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleMail = (event: { target: { value: string } }) => {
    if (!isValidEmail(event.target.value)) {
      console.log(usersState)
      setErrorMessage('Email is invalid')
    } else {
      setErrorMessage('')
      usersDispatch({ type: 'UPDATE', payload: event.target.value, input: 'email' })
    }
  }

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
                        defaultValue={baseData.firstname}
                        type='text'
                        disabled={isDisabled}
                        onChange={e =>
                          usersDispatch({ type: 'UPDATE', payload: e.target.value, input: 'firstname' })
                        }
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
                        defaultValue={baseData.lastname}
                        disabled={isDisabled}
                        onChange={e =>
                          usersDispatch({ type: 'UPDATE', payload: e.target.value, input: 'lastname' })
                        }
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
                        defaultValue={baseData.email}
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
                        defaultValue={baseData.tel}
                        disabled={isDisabled}
                        onChange={e =>
                          usersDispatch({ type: 'UPDATE', payload: e.target.value, input: 'tel' })
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className='text-center'>
            {isDisabled ? (
              <button
                className='custom-buttons justify-self-center font-paragraph inline-block mr-4'
                type='button'
                onClick={() =>setIsDisabled(!isDisabled)}
              >
                <p>Modify</p>
              </button>
            ) : (
              <button
                className='custom-buttons justify-self-center font-paragraph inline-block mr-4'
                type='button'
                onClick={async() =>{
                 await  updateUser({
                    variables: {
                      id: token.id?.toString(),
                      firstname: usersState.firstname,
                      lastname: usersState.lastname,
                      email: usersState.email,
                      firsttelname: usersState.tel,
                    },
                  })
                  setIsDisabled(!isDisabled)
                }
              }
              >
                <p>Save</p>
              </button>
            )}

            {isDisabled ? null : <p className='mx-auto mb-0 inline-block'>You can now modify your informations</p>}
            {updateLoading ? <p>Updating...</p> : error ? <p>Update error! {updatedError?.message}</p> : ''}
          </div>
        </div>
      </div>
    </>
  )
}
