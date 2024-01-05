import { gql } from "@apollo/client";

export const mutationSignin = gql`
  mutation SignIn($password: String!, $email: String!) {
    signIn(password: $password, email: $email) {
      id
      email
    }
  }
`;
