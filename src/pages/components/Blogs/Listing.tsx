import Link from "next/link";

import { Blog } from "@/pages/types";
import Tag from "../Tag";
import { getDate } from "@/pages/libs/date";

export default function BlogListing({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {blogs.length ? (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="border p-2 flex flex-col rounded-3xl gap-2 justify-between h-96"
          >
            <div className="flex flex-col gap-12 bg-purple-100 rounded-2xl p-2 text-black h-64 justify-between">
              <>
                <span className="px-2 py-1 bg-white text-black rounded-full w-fit">
                  {getDate(blog.published)}
                </span>
              </>
              <>
                <h2
                  className="text-3xl line-clamp-2 text-ellipsis"
                  title={blog.title}
                >
                  {blog.title}
                </h2>
              </>
              <div className="flex flex-wrap gap-1">
                {blog.tags?.length
                  ? blog.tags.map((tag) => (
                      <Tag
                        tag={tag}
                        key={tag.id}
                        active
                        disableLink
                        size="sm"
                      />
                    ))
                  : null}
              </div>
            </div>
            <p className="line-clamp-2 overflow-ellipsis">{blog.excerpt}</p>
            <Link
              href={`/blog/${blog.slug}`}
              className="border rounded-full px-4 py-1.5 hover:bg-white hover:text-black w-fit"
            >
              Read
            </Link>
          </div>
        ))
      ) : (
        <h2>Add a blog to see it.</h2>
      )}
    </div>
  );
}
