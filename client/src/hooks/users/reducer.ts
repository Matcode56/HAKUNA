import decode from 'jwt-decode'

export const usersInitialState: Users = {
  email: '',
  password: '',
  confirmPassword: '',
  firstname: '',
  lastname: '',
  tel: '',
  role: '',
  isConnected: false,
}

export const usersReducer = (usersState: Users, action: UsersAction): Users => {
  const { type, payload, input } = action

  switch (type) {
    case 'LOGIN':
      let copyState = { ...usersState }
      if (input === 'email') {
        copyState.email = payload
      } else if (input === 'password') {
        copyState.password = payload
      } else if (input === 'login') {
        const token: Token = decode(localStorage.getItem('token')!)
        copyState.role = token.role
        copyState.isConnected = true
      }
      return copyState

    case 'LOGOUT':
      usersState.email = ''
      usersState.password = ''
      usersState.role = ''
      usersState.isConnected = false
      return usersState

    case 'REGISTER':
      let copyStateRegister = { ...usersState }

      if (input === 'email') {
        copyStateRegister.email = payload
      } else if (input === 'password') {
        copyStateRegister.password = payload
      } else if (input === 'confirmPassword') {
        copyStateRegister.confirmPassword = payload
      } else if (input === 'firstname') {
        copyStateRegister.firstname = payload
      } else if (input === 'lastname') {
        copyStateRegister.lastname = payload
      } else if (input === 'tel') {
        copyStateRegister.tel = payload
      }

      return copyStateRegister

    case 'RESET_PASSWORD':
      let copyStateReset = { ...usersState }

      if (input === 'password') {
        copyStateReset.password = payload
      } else if (input === 'confirmPassword') {
        copyStateReset.confirmPassword = payload
      }

      return copyStateReset

    default:
      return usersState
  }
}
