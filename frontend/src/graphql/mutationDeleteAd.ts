import { gql } from "@apollo/client";

export const mutationDeleteAd = gql`
  mutation deleteAd($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId)
  }
`;
