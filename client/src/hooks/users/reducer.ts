export const usersInitialState: Users = {
  email: '',
  password: '',
  isConnected: false,
  firstname: '',
  lastname: '',
  tel: 0
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
        copyState.isConnected = true
      }
      return copyState

    case 'LOGOUT':
      usersState.isConnected = false
      return usersState

      case 'UPDATE': 
      let copyPrevious = { ...usersState }
      if(input === 'firstname') {
        copyPrevious.firstname = payload
      } else if( input === 'lastname' ){
        copyPrevious.lastname = payload
      } else if( input === 'email' ){
        copyPrevious.email = payload
      }  else if( input === 'phone' ){
        copyPrevious.tel = payload
      }
      return copyPrevious
      
    default:
      return usersState
  }
}