import React from "react";

type Props = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: Props) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border px-3 py-2 w-full rounded"
    />
  </div>
);

export default FormInput;
