import React from 'react';

const TextInput = ({type='text', placeholder, onChange, size='large', defaultValue = ''}) => {
  return(
    <input className={`textinput--${size}`} type={type} placeholder={placeholder} onChange={onChange} defaultValue={defaultValue} />
  )
}

export default TextInput;