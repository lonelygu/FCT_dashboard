// src/components/ui/input.jsx
import React from "react";

export const Input = ({ placeholder, className }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`px-4 py-2 rounded ${className}`}
    />
  );
};
