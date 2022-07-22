import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import './scss/style.scss'
import { App } from './App'
import { Navigation } from './components/Navbar'
import { Projects } from './components/Project/Projects'
import reportWebVitals from './reportWebVitals'
import { ProjectProvider } from './hooks/projects/context'
import { Login } from './components/Login'

// Attraper les erreurs de l'API GraphQL et les afficher dans la console

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     // cartographier les erreurs de l'API GraphQLst
//     // pour chaque erreur on saisi le message, on cherche l'emplacement de l'erreur et on affiche le code de l'erreur
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );

//   const link = from([
//     errorLink,
//     new HttpLink({ uri: "http://localhost:8080/graphql" }),
//   ]);

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
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
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/home' element={<App />} />
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
