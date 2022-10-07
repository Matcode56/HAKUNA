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

  // const checkForm = ({ email, password, confirmPassword, firstname, lastname, tel }: Users) => {
  //   const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
  //   const passwordRegex = new RegExp('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,}$', 'g')
  //   const telRegex = new RegExp('^[0-9]{10}$')
  //   const nameRegex = new RegExp(
  //     "[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$",
  //     'g'
  //   )

  //   if (!emailRegex.test(email)) {
  //     return console.log('Email non valide')
  //   } else if (!passwordRegex.test(password)) {
  //     return console.log('Mot de passe non valide')
  //   } else if (confirmPassword !== password) {
  //     return console.log('Mot de passe non égal')
  //   } else if (!nameRegex.test(firstname)) {
  //     return console.log('Prénom non conforme')
  //   } else if (!nameRegex.test(lastname)) {
  //     return console.log('Nom non conforme')
  //   } else if (!telRegex.test(tel)) {
  //     return console.log('Téléphone non conforme')
  //   } else {
  //     usersState.isConnected = true
  //   }
  // }

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
      } /* else if (input === 'register') {
        checkForm(copyStateRegister)
      } */

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
