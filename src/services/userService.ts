import { gql } from "@apollo/client";

export const GET_USER_IN_ID = gql`
  query($id: String!) {
    readOneUserID(_id: $id) {
      _id
      email
      name
    }
  }
`

export const CREATE_SESSION_USER = gql`
  mutation($createSessionInput: CreateSessionInput!){
    createSession(createSessionInput: $createSessionInput) {
      _id
      token
      email
      name
    }
  }
`