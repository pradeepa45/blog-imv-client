"use client";

import React from "react";

import { Tag } from "@/pages/types";

import FormInput from "./Input";
import TextAreaInput from "./TextArea";
import FileUpload from "./Upload";
import TagSelect from "./TagSelect";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Form({ categories }: { categories: Tag[] }) {
  const [formInput, setFormInput] = React.useState({
    title: "",
    content: "",
    excerpt: "",
    tags: "",
    heroImage: "",
  });
  const { title, excerpt, content, tags } = formInput;
  const router = useRouter();

  const handleInputChange = (e: any) => {
    console.log(e);
    const { name, value } = e.target;
    setFormInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = (url: string) => {
    setFormInput((prevState) => ({ ...prevState, heroImage: url }));
  };

  const handleFormSubmit = async () => {
    const resp = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInput),
    }).then((response) => {
      if (response.ok) {
        console.log("Form submitted successfully");
        router.push("/success");
      }
    });
  };

  return (
    <>
      <FormInput
        placeholder="Enter the blog title"
        value={title}
        onChange={handleInputChange}
        name="title"
        label="Title of the blog"
      />
      <FormInput
        placeholder="Blog excerpt"
        value={excerpt}
        onChange={handleInputChange}
        name="excerpt"
        label="Blog excerpt"
      />
      <FileUpload onChange={handleImageUpload} />
      <TextAreaInput
        name="content"
        value={content}
        onChange={handleInputChange}
        label="Blog content"
      />
      {/* <TagSelect tags={categories} /> */}
      <FormInput
        placeholder="Blog category"
        value={tags}
        onChange={handleInputChange}
        name="tags"
        label="Blog category"
      />
      <Button className="w-fit border" onClick={handleFormSubmit}>
        Submit
      </Button>
    </>
  );
}
