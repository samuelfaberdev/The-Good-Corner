import { gql } from "@apollo/client";

export const getOneAd = gql`
  query getOneAd($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
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
