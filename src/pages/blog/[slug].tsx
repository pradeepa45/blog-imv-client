import { useRouter } from "next/router";
import { getTags } from "../queries/tags";
import client from "../libs/apolloClient";
import { getBlogsWithCategory, getBlogWithSlug } from "../queries/blogs";
import Sidebar from "../components/Categories/SideBar";
import { Blog, Tag } from "../types";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage({ tags, blog }: { tags: Tag[]; blog: Blog }) {
  const { title, excerpt, content, heroImage } = blog;
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
        <aside className="basis-60 p-4 border-r">
          <Sidebar tags={tags} activeElement={slug as string} />
        </aside>
        <div className="py-2 px-4 basis-full flex flex-col gap-4">
          <h1>{title}</h1>
          <p>{excerpt}</p>
          {heroImage && (
            <div className="relative h-72">
              <Image
                src={heroImage}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <p>{content}</p>
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
        query: getBlogWithSlug,
        variables: {
          slug: context.params.slug,
        },
      }),
    ]);
    const { tags } = tagsResponse.data;
    const { blogWithSlug } = blogsResponse.data;
    return {
      props: {
        tags: tags || [],
        blog: blogWithSlug || [],
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
