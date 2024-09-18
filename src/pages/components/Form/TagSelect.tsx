"use client";

import { useState } from "react";

import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/components/ui/extension/multi-select";
import { Tag } from "@/pages/types";

const TagSelect = ({ tags }: { tags: Tag[] }) => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <MultiSelector
      values={value}
      onValuesChange={setValue}
      loop={true}
      className="text-white"
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select your framework" />
      </MultiSelectorTrigger>
      <MultiSelectorContent className="text-white">
        <MultiSelectorList>
          {tags.map((option) => (
            <MultiSelectorItem key={option.id} value={option.name}>
              {option.name}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};

export default TagSelect;
