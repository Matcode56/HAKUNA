import { gql } from '@apollo/client'

// GET_PROJECTS nous permet de récupérer les données de la base de données
// $id est un paramètre qui nous permet de récupérer un projet en particulier

export const CREATE_PROJECT = gql`
  mutation createProject($name: String!, $description: String!, $deadline: String!, $createdAt: String!) {
    createProject(name: $name, description: $description, deadline: $deadline, createdAt: $createdAt) {
      id
      name
      description
      deadline
      createdAt
    }
  }
`

export const UPDATE_PROJECT = gql`
  mutation updateProject($updateProjectId: String!, $name: String!, $description: String!, $deadline: String!) {
    updateProject(id: $updateProjectId, name: $name, description: $description, deadline: $deadline) {
      id
      name
      description
      deadline
    }
  }
`

export const DELETE_PROJECT = gql`
  mutation Mutation($deleteProjectId: String) {
    deleteProject(id: $deleteProjectId) {
      id
    }
  }
`

export const LOGIN = gql`
  mutation Mutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstname
        lastname
        email
        tel
        roles
      }
    }
  }
`

export const REGISTER = gql`
  mutation Mutation($firstname: String, $lastname: String, $password: String, $email: String, $tel: String) {
    createUser(firstname: $firstname, lastname: $lastname, password: $password, email: $email, tel: $tel) {
      firstname
      lastname
      password
      email
      tel
    }
  }
`
