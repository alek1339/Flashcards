import React from 'react';

import { func, string, bool } from 'prop-types';
import './Button.scss';

const Button = ({ onClick, label, className, isDisabled }) => {
  return (
    <button disabled={isDisabled} onClick={onClick} className={`${className}`}>
        {label}
    </button>
  )
}

Button.propTypes = {
    onClick: func,
    label: string,
    className: string,
    isDisabled: bool,
};

Button.defaultProps = {
  isDisabled: false,
};

export default Button