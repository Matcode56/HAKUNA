import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      id
      name
      description
      createdAt
      deadline
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
