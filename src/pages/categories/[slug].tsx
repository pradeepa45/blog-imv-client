import { useRouter } from "next/router";
import { getTags } from "../queries/tags";
import client from "../libs/apolloClient";
import { getBlogsWithCategory } from "../queries/blogs";
import Sidebar from "../components/Categories/SideBar";
import { Blog, Tag } from "../types";
import Link from "next/link";
import BlogListing from "../components/Blogs/Listing";

export default function Category({
  tags,
  blogs,
}: {
  tags: Tag[];
  blogs: Blog[];
}) {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <main className="min-h-screen flex flex-col">
      <div className="border-b flex items-center justify-between p-2 sticky top-0 bg-black">
        <Link
          href="/"
          className="border rounded-md p-2 hover:bg-white hover:text-black"
        >
          Home
        </Link>
        <Link
          href="/new"
          className="border rounded-md p-2 hover:bg-white hover:text-black"
        >
          New blog
        </Link>
      </div>
      <section className="flex h-screen">
        <aside className="basis-80 p-4 border-r">
          <h1>Categories</h1>
          <Sidebar tags={tags} activeElement={slug as string} />
        </aside>
        <div className="p-2 basis-full">
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
      client.query({
        query: getBlogsWithCategory,
        variables: {
          slug: context.params.slug,
        },
      }),
    ]);
    const { tags } = tagsResponse.data;
    const { blogsWithCategory } = blogsResponse.data;
    return {
      props: {
        tags: tags || [],
        blogs: blogsWithCategory || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        tags: null,
        blogs: null,
      },
    };
  }
}
