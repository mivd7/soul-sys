import { gql } from "@apollo/client";

export const GET_PLANETS = gql`
  query GetPlanets {
    allPlanets {
    id
    englishName
    axialTilt
    semimajorAxis
    meanRadius
  }
  }
`;
