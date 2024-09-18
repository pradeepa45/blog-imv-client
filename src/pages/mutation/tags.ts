import { gql } from "@apollo/client";

export const createTag = gql`
  mutation CreateTag($name: String!) {
    createTag(name: $name) {
      name
      id
      slug
    }
  }
`;
