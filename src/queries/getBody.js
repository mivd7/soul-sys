import { gql } from "@apollo/client";

export const GET_BODY = gql`
  query GetBody($id: ID!) {
    body(id: $id) {
        id
        englishName
        axialTilt
        semimajorAxis
        meanRadius
        polarRadius
        equaRadius
    }
  }
`;
