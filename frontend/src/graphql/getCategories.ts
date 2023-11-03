import { gql } from "@apollo/client";

export const getCategories = gql`
  query getCategories {
    getCategories {
      id
      name
    }
  }
`;
