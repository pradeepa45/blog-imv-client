import { gql } from "@apollo/client";

export const getTags = gql`
  query Tags {
    tags {
      name
      id
      slug
    }
  }
`;
