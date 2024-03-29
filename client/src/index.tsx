import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import './scss/style.scss'
import { App } from './App'
import { Navigation } from './components/Navbar/Navbar'
import { Projects } from './components/Project/Projects'
import reportWebVitals from './reportWebVitals'
import { ProjectProvider } from './hooks/projects/context'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { Profile } from './components/Profile/Profile'
import { UsersProvider } from './hooks/users/context'
import { ForgotPassword } from './components/ResetPassword/ForgotPassword'
import { ResetPassword } from './components/ResetPassword/ResetPassword'

const httpLink = createHttpLink({
  uri: 'http://localhost:5001/graphql',
  credentials: 'same-origin',
})

/* Add token in headers */
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// ApolloProvider et ApolloClient sont des composants React qui sont utilisés pour connecter le client à l'API GraphQL
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ProjectProvider>
        <UsersProvider>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/home' element={<App />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='reset-password' element={<ResetPassword />} />
            </Routes>
          </BrowserRouter>
        </UsersProvider>
      </ProjectProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
