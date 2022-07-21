import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // HttpLink,
  // from,
} from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import "./scss/style.scss";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Navbar from "./components/Navbar";
import { Projects } from "./components/Project/Projects";
import { ProjectProvider } from "./hooks/context";
import { Login }  from "./components/Login";
import { Register } from "./components/Register";

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

// ApolloProvider et ApolloClient sont des composants React qui sont utilisés pour connecter le client à l'API GraphQL
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ProjectProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/home" element={<App />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
