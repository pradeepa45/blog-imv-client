import * as React from "react";

import type { Tag } from "../types";
import client from "../libs/apolloClient";
import { getTags } from "../queries/tags";
import Form from "../components/Form";
import Link from "next/link";

export default function NewBlog({ tags }: { tags: Tag[] }) {
  return (
    <div className="max-w-screen-xl self-center flex flex-col gap-3 mx-auto">
      <nav className="mt-4">
        <Link href="/" className="bg-white text-black p-2 rounded-sm">
          Back to Home
        </Link>
      </nav>
      <h1>Write a new blog</h1>
      <Form categories={tags} />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: getTags,
    });
    const { tags } = data;
    return {
      props: {
        tags,
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
