import type { Tag as TagType } from "@/pages/types";
import Tag from "../../Tag";

export default function Sidebar({
  tags,
  activeElement,
}: {
  tags: TagType[];
  activeElement?: string;
}) {
  return (
    <div className="flex flex-wrap">
      {tags.map((tag) => (
        <Tag tag={tag} key={tag.id} active={activeElement === tag.slug} />
      ))}
    </div>
  );
}
