import React from "react";
import "./style.css";
export const Input = ({ label, name, type, value, onChange, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className="form-control"
        id={name}
        name={name}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
