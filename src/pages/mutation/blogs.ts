import { gql } from "@apollo/client";

export const createBlog = gql`
  mutation CreateBlog($input: CreateBlogInput!) {
    createBlog(input: $input) {
      id
      title
      excerpt
      content
      heroImage
      slug
      tags {
        name
      }
    }
  }
`;
