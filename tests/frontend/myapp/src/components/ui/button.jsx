// src/components/ui/button.jsx
import React from "react";

export const Button = ({ className, children }) => {
  return (
    <button className={`px-4 py-2 rounded ${className}`}>
      {children}
    </button>
  );
};
