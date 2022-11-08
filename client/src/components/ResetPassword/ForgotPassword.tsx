import { useMutation } from '@apollo/client'
import { useRef, useState } from 'react'
import { FORGOT_PASSWORD } from '../../Graphql/Mutations'

export const ForgotPassword = () => {
  const [ForgotPassword] = useMutation(FORGOT_PASSWORD)
  const [email, setEmail] = useState('')
  const messageRef = useRef<HTMLElement>(null)

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='w-full max-w-xs'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-4 items-center justify-between'>
            <button
              type='button'
              className='text-right bg-lavender text-white px-5 py-1 rounded-xl drop-shadow-md'
              onClick={async () => {
                try {
                  await ForgotPassword({ variables: { email } })
                  messageRef.current!.classList.add('text-green-500')
                  messageRef.current!.innerText = 'Check your email for a link to reset your password'
                } catch (error: any) {
                  messageRef.current!.classList.add('text-red-500')
                  messageRef.current!.innerText = error.message
                }
              }}
            >
              Reset Password
            </button>
            <small className='italic text-center' ref={messageRef}></small>
          </div>
        </form>
      </div>
    </div>
  )
}
