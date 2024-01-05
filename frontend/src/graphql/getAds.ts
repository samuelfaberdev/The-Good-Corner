import { gql } from "@apollo/client";

export const getAds = gql`
  query getAds {
    getAds {
      id
      title
      price
      description
      imgSrc
    }
  }
`;
