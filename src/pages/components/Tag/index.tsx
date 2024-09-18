import type { Tag as TagType } from "@/pages/types";
import Link from "next/link";

export default function Tag({
  tag,
  active,
  disableLink = false,
  size = "lg",
}: {
  tag: TagType;
  active?: boolean;
  disableLink?: boolean;
  size?: "sm" | "lg";
}) {
  const { name, slug } = tag;
  return (
    <div className="flex items-center m-1">
      <div
        className={`${
          active
            ? "border border-purple-500 text-purple-500"
            : "bg-purple-300 text-black"
        } ${size === "sm" ? "px-1 py-0.5 text-xs" : "px-2 py-1 text-base"}
          px-2 py-1 rounded-md`}
      >
        <Link href={`/categories/${slug}`} aria-disabled={disableLink}>
          {name}
        </Link>
      </div>
    </div>
  );
}
