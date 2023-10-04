import React from "react";
import PropTypes from "prop-types";
import "./TextareaInput.scss";

const TextareaInput = ({ value, onChange, className }) => {
  return <textarea className={`textarea-input ${className}`} value={value} onChange={onChange}></textarea>;
};

TextareaInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default TextareaInput;
