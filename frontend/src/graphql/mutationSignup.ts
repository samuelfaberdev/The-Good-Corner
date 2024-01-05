import { gql } from "@apollo/client";

export const mutationSignup = gql`
  mutation SignUp($data: UserInput!) {
    signUp(data: $data) {
      id
      email
    }
  }
`;
