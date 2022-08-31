export const usersInitialState: Users[] = [
  {
    email: '',
    password: '',
    roles: '',
  },
]

export const usersReducer = (usersState: Users[], action: UsersAction): Users[] => {
  const { type, payload, payloadLogin, payloadInput, payloadRoles, payloadMail } = action

  switch (type) {
    case 'LOGIN':
      let copyCreate = { ...usersState[0] }

      if (payloadInput === 'email') {
        copyCreate.email = payloadLogin
      } else if (payloadInput === 'password') {
        copyCreate.password = payloadLogin
      }

      usersState[0] = copyCreate
      return [...usersState]

    case 'SUCCESS_LOGIN':
      let copyUser = { ...usersState[0] }

      copyUser.password = ''
      if (payload !== undefined) {
        copyUser.roles = payload.roles
      } else {
        copyUser.roles = payloadRoles
        copyUser.email = payloadMail
      }

      usersState[0] = copyUser
      return [...usersState]

    default:
      return usersState
  }
}
