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
  query Query($email: String) {
    getUser(email: $email) {
      id
      firstname
      lastname
      tel
      roles
    }
  }
`
