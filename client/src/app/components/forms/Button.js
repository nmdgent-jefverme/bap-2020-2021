import React from 'react';

const Button = ({placeholder, onClick, size='large'}) => {
  return(
    <button onClick={onClick} className={`button--${size}`}>{placeholder}</button>
  )
}

export default Button;