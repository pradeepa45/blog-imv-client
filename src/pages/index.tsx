import Link from "next/link";

import client from "./libs/apolloClient";
import { getTags } from "./queries/tags";
import type { Blog as BlogType, Tag as TagType } from "./types";
import { getBlogs } from "./queries/blogs";
import BlogListing from "./components/Blogs/Listing";
import Sidebar from "./components/Categories/SideBar";

export default function Home({
  tags,
  blogs,
}: {
  tags: TagType[];
  blogs: BlogType[];
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="border-b flex items-center justify-end p-2 sticky top-0 bg-black">
        <Link
          href="/new"
          className="border rounded-md p-2 hover:bg-white hover:text-black"
        >
          New blog
        </Link>
      </div>
      <section className="flex h-screen">
        <aside className="basis-80 p-4 border-r sticky top-0">
          <h1>Categories</h1>
          <Sidebar tags={tags} />
        </aside>
        <div className="px-4 py-2 basis-full">
          <BlogListing blogs={blogs} />
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const [tagsResponse, blogsResponse] = await Promise.all([
      client.query({ query: getTags }),
      client.query({ query: getBlogs }),
    ]);
    const { tags } = tagsResponse.data;
    const { blogs } = blogsResponse.data;
    return {
      props: {
        tags,
        blogs,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        tags: null,
      },
    };
  }
}
