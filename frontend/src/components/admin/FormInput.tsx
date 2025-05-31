import React from "react";

type Props = {
  label: string;
  type?: string;
  value?: string; // ✅ devient optionnel
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
};

const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
}: Props) => (
  <div className="form-group row mb-3">
    <label className="col-sm-4 col-form-label">{label}</label>
    <div className="col-sm-8">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        {...(value !== undefined && onChange ? { value, onChange } : {})} // ✅ condition : soit contrôlé, soit non contrôlé
        className="form-control"
      />
    </div>
  </div>
);

export default FormInput;
