"use client";

import React, { ChangeEventHandler } from "react";

interface InputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  placeholder: string;
  label: string;
}

const FormInput = ({
  value,
  onChange,
  name,
  placeholder,
  label,
}: InputProps) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className="w-full text-black"
      />
    </div>
  );
};

export default FormInput;
