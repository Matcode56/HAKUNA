/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react'

export const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('token') && loading === true) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [loading])

  return (
    <div className='flex justify-center pt-10'>
      <h1>Accueil</h1>
    </div>
  )
}
