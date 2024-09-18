"use client";

import React from "react";

interface TextareaProps {
  value: string;
  onChange: (e: any) => void;
  name: string;
  label: string;
}

const TextAreaInput = ({ value, onChange, name, label }: TextareaProps) => (
  <>
    <label>{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      name={name}
      rows={4}
      className="text-black"
    />
  </>
);

export default TextAreaInput;
