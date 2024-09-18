import { gql } from "@apollo/client";

export const getBlogs = gql`
  query Blogs {
    blogs {
      id
      title
      excerpt
      content
      heroImage
      published
      slug
      tags {
        id
        name
        slug
      }
    }
  }
`;

export const getBlogsWithCategory = gql`
  query BlogsWithCategory($slug: String!) {
    blogsWithCategory(slug: $slug) {
      id
      title
      excerpt
      content
      slug
      published
      heroImage
      tags {
        id
        name
        slug
      }
    }
  }
`;

export const getBlogWithSlug = gql`
  query blogWithSlug($slug: String!) {
    blogWithSlug(slug: $slug) {
      id
      title
      excerpt
      content
      heroImage
      published
      tags {
        id
        name
        slug
      }
    }
  }
`;
