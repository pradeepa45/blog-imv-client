import type { NextApiRequest, NextApiResponse } from "next";

import client from "../libs/apolloClient";
import { createBlog } from "../mutation/blogs";
import { Blog } from "../types";

interface ResponseData {
  blog?: Blog;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=29"
    );
    const { title, content, excerpt, heroImage, tags } = await req.body;
    const { data } = await client.mutate({
      mutation: createBlog,
      variables: {
        input: {
          title,
          content,
          excerpt,
          heroImage,
          tags,
        },
      },
    });
    const { createBlog: blog } = data;
    if (blog) return res.status(200).json({ blog });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
