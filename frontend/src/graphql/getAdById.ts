import { gql } from "@apollo/client";

export const getOneAd = gql`
  query getOneAd($getAdById: Float!) {
    getAdById(id: $getAdById) {
      id
      title
      price
      description
      category {
        id
        name
      }
    }
  }
`;
