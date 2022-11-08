import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      id
      name
      description
      createdAt
      deadline
      project_owner {
        firstname
        lastname
      }
    }
  }
`
export const GET_USER = gql`
  query getUser($id: String) {
    getUser(id: $id) {
      id
      firstname
      lastname
      tel
      roles
      email
    }
  }
`
export const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      firstname
      lastname
      tel
      roles
      email
    }
  }
`
