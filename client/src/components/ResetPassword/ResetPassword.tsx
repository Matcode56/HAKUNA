import { useMutation } from '@apollo/client'
import decode from 'jwt-decode'
import { useContext, useRef, useState } from 'react'
import { RESET_PASSWORD } from '../../Graphql/Mutations'
import { UsersContext } from '../../hooks/users/context'
import { EyeEmpty, EyeOff } from 'iconoir-react'

export const ResetPassword = () => {
  /* GraphQl */
  const [resetPassword] = useMutation(RESET_PASSWORD)
  /* React */
  const { usersState, usersDispatch } = useContext(UsersContext)
  const { password, confirmPassword } = usersState
  const [seePassword, setSeePassword] = useState(false)
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)

  /* URL */
  const params = window.location.search
  const token = params.split('=')[1]
  const tokenDecode: Token = decode(token)
  console.log(tokenDecode)
  localStorage.setItem('token', token)

  const refs = {
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
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
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='w-full max-w-xs'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-4 font-subtitle' htmlFor='password'>
              New Password
            </label>
            <div className='relative'>
              <input
                ref={refs.password}
                className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type='password'
                placeholder='******************'
                value={password}
                onChange={e => usersDispatch({ type: 'RESET_PASSWORD', input: 'password', payload: e.target.value })}
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
              Confirm your new password
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
                    type: 'RESET_PASSWORD',
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
          <div className='flex items-center justify-between'>
            <button
              ref={refs.submit}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
              onClick={async () => {
                try {
                  validateForm()
                  console.log(tokenDecode.id)
                  console.log(usersState.password)

                  await resetPassword({ variables: { id: tokenDecode.id?.toString(), password: usersState.password } })
                } catch (error) {
                  console.log(error)
                }
              }}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
