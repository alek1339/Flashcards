import React from "react";
import PropTypes from "prop-types";
import "./TextareaInput.scss";

const TextareaInput = ({ value, onChange }) => {
  return <textarea className="textarea-input" value={value} onChange={onChange}></textarea>;
};

TextareaInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextareaInput;
