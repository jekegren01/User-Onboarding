import React from "react";
import './App.css';

export default function Input(props) {
  const errorMessage = props.errors[props.name];
  return (
    <label htmlFor="name">
      {props.label}
      <input {...props} />
      {errorMessage.length !== 0 && <p className="error">{errorMessage}</p>}
    </label>
  );
}