import React from 'react';

const TextInput = ({type='text', placeholder, onChange, size='large'}) => {
  return(
    <input className={`textinput--${size}`} type={type} placeholder={placeholder} onChange={onChange} />
  )
}

export default TextInput;