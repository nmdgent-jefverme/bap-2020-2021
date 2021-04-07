import React from 'react';

const Button = ({placeholder, onClick, size='large', disabled=false}) => {
  return(
    <button onClick={onClick} className={`button--${size}`} disabled={disabled} >{placeholder}</button>
  )
}

export default Button;