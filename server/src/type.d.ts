declare module 'cors'
declare module 'mysql'

interface Users {
  id?: Number
  firstname?: string
  lastname?: string
  email: string
  password?: string
  tel?: number | string
  roles?: string
  isConnected: boolean
}
