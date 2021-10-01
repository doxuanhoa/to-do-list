import React from "react";

export const Required = (value) => {
  const message = "This field is required";
  if (!value) {
    return <small className="form-text text-left text-danger">{message}</small>;
  }
};
