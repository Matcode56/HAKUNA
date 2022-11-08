import { useMutation } from '@apollo/client'
import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { REGISTER } from '../../Graphql/Mutations'
import { UsersContext } from '../../hooks/users/context'
import { EyeEmpty, EyeOff } from 'iconoir-react'

export const Register = () => {
  const { usersState, usersDispatch } = useContext(UsersContext)
  const { email, firstname, lastname, tel, password, confirmPassword } = usersState
  const [seePassword, setSeePassword] = useState(false)
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)
  const [register] = useMutation(REGISTER)
  const navigate = useNavigate()

  const refs = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
    firstname: useRef<HTMLInputElement>(null),
    lastname: useRef<HTMLInputElement>(null),
    tel: useRef<HTMLInputElement>(null),
    submit: useRef<HTMLButtonElement>(null),
  }

  const regex = {
    email: new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
    password: new RegExp('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,}$', 'g'),
    tel: new RegExp('^[0-9]{10}$'),
    name: new RegExp(
      "[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$",
      'g'
    ),
  }

  const checkInputOnBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    typeInput: RegExp,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    const value = e.target.value
    const inputName = ref.current!.id

    if (inputName === 'confirmPassword') {
      if (value !== password && value !== '') {
        ref.current!.nextSibling!.textContent = 'Both password are not same'
        ref.current!.classList.remove('border-green-500')
        ref.current!.classList.add('border-red-500')
        return
      } else if (value === '') {
        ref.current!.nextSibling!.textContent = 'Confirm password is required'
        ref.current!.classList.remove('border-green-500')
        ref.current!.classList.add('border-red-500')
        return
      } else if (value === password) {
        ref.current!.classList.add('border-green-500')
        ref.current!.classList.remove('border-red-500')
        ref.current!.nextSibling!.textContent = ''
        return
      }
    }

    if (!typeInput.test(value) && value !== '') {
      ref.current!.nextSibling!.textContent = `${inputName.charAt(0).toUpperCase() + inputName.slice(1)} is not valid`
      ref.current!.classList.remove('border-green-500')
      ref.current!.classList.add('border-red-500')
      return
    }
    if (value === '') {
      ref.current!.classList.remove('border-green-500')
      ref.current!.classList.remove('border-red-500')
      ref.current!.nextSibling!.textContent = ''
      return
    }
    ref.current!.classList.remove('border-red-500')
    ref.current!.classList.add('border-green-500')
    ref.current!.nextSibling!.textContent = ''
  }

  const validateForm = () => {
    /* Remove last item (don't check submit button) */
    const refsArray = Object.values(refs).slice(0, Object.values(refs).length - 1)

    refsArray.forEach(input => {
      if (
        input.current?.id !== undefined &&
        input.current!.value !== '' &&
        input.current!.classList.contains('border-green-500')
      ) {
        refs.submit.current!.disabled = false
      } else {
        refs.submit.current!.disabled = true
      }
    })
  }

  return (
    <div className='flex justify-center ml-8'>
      <div className='container bg-white  py-10 mt-5 rounded-3xl shadow-xl w-1/3 px-12 grid max-h-screen overflow-scroll mb-10'>
        <img src='/icons/HakunaLogo.png' alt='logo' className='justify-self-center ml-8 -mb-16' />
        <form>
          <h1 className='text-center font-title mb-5 uppercase text-xl underline'>Create an account</h1>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-4 font-subtitle' htmlFor='email'>
              Email
            </label>
            <input
              ref={refs.email}
              className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='example@mail.com'
              value={email}
              onChange={e => usersDispatch({ type: 'REGISTER', input: 'email', payload: e.target.value })}
              onBlur={e => checkInputOnBlur(e, regex.email, refs.email)}
            />
            <small className='text-red-500 text-xs italic'></small>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-4 font-subtitle' htmlFor='password'>
              Password
            </label>
            <div className='relative'>
              <input
                ref={refs.password}
                className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type='password'
                placeholder='******************'
                value={password}
                onChange={e => usersDispatch({ type: 'REGISTER', input: 'password', payload: e.target.value })}
                onBlur={e => checkInputOnBlur(e, regex.password, refs.password)}
              />
              {seePassword ? (
                <EyeEmpty
                  className='absolute right-0 top-0 mt-2 mr-4 cursor-pointer'
                  onClick={() => {
                    refs.password.current!.type = 'password'
                    setSeePassword(false)
                  }}
                />
              ) : (
                <EyeOff
                  className='absolute right-0 top-0 mt-2 mr-4 cursor-pointer'
                  onClick={() => {
                    refs.password.current!.type = 'text'
                    setSeePassword(true)
                  }}
                />
              )}
            </div>
            <small className='text-red-500 text-xs italic'></small>
            <ul className='text-gray-500 text-xs italic'>
              <li>Minimum 8 characters</li>
              <li>Uppercase letter</li>
              <li>Lowercase letter</li>
              <li>Number</li>
              <li>Special character</li>
            </ul>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-4 font-subtitle' htmlFor='confirmPassword'>
              Confirm your password
            </label>
            <div className='relative'>
              <input
                ref={refs.confirmPassword}
                className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                id='confirmPassword'
                type='password'
                placeholder='******************'
                value={confirmPassword}
                onChange={e =>
                  usersDispatch({
                    type: 'REGISTER',
                    input: 'confirmPassword',
                    payload: e.target.value,
                    confirm: usersState.password,
                  })
                }
                onBlur={e => checkInputOnBlur(e, regex.password, refs.confirmPassword)}
              />
              {seeConfirmPassword ? (
                <EyeEmpty
                  className='absolute right-0 top-0 mt-2 mr-4 cursor-pointer'
                  onClick={() => {
                    refs.confirmPassword.current!.type = 'password'
                    setSeeConfirmPassword(false)
                  }}
                />
              ) : (
                <EyeOff
                  className='absolute right-0 top-0 mt-2 mr-4 cursor-pointer'
                  onClick={() => {
                    refs.confirmPassword.current!.type = 'text'
                    setSeeConfirmPassword(true)
                  }}
                />
              )}
            </div>
            <small className='text-red-500 text-xs italic'></small>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-4 font-subtitle' htmlFor='firstname'>
              Firstname
            </label>
            <input
              ref={refs.firstname}
              className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='firstname'
              type='text'
              placeholder='John'
              value={firstname}
              onChange={e => usersDispatch({ type: 'REGISTER', input: 'firstname', payload: e.target.value })}
              onBlur={e => checkInputOnBlur(e, regex.name, refs.firstname)}
            />
            <small className='text-red-500 text-xs italic'></small>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-4 font-subtitle' htmlFor='lastname'>
              Lastname
            </label>
            <input
              ref={refs.lastname}
              className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='lastname'
              type='text'
              placeholder='Doe'
              value={lastname}
              onChange={e => usersDispatch({ type: 'REGISTER', input: 'lastname', payload: e.target.value })}
              onBlur={e => checkInputOnBlur(e, regex.name, refs.lastname)}
            />
            <small className='text-red-500 text-xs italic'></small>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-4 font-subtitle' htmlFor='phone'>
              Phone
            </label>
            <input
              ref={refs.tel}
              className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='phone'
              type='tel'
              placeholder='0700000001'
              value={tel}
              onChange={e => usersDispatch({ type: 'REGISTER', input: 'tel', payload: e.target.value })}
              onBlur={e => checkInputOnBlur(e, regex.tel, refs.tel)}
            />
            <small className='text-red-500 text-xs italic'></small>
          </div>
          <div className='flex items-center justify-between'>
            <button
              ref={refs.submit}
              className='custom-buttons justify-self-center font-paragraph'
              type='button'
              onClick={async () => {
                try {
                  validateForm()
                  await register({
                    variables: {
                      email: email,
                      password: password,
                      firstname: firstname,
                      lastname: lastname,
                      tel: tel,
                    },
                  })
                  navigate('/')
                } catch (err) {
                  console.log(err)
                }
              }}
            >
              Register
            </button>
            <div className='flex flex-col'>
              <Link
                className='inline-block align-baseline font-bold text-sm text-lavender font-paragraph hover:text-blue-800'
                to='/'
              >
                Already have an account ?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
