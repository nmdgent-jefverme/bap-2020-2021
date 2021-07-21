import React from 'react';

const TextInput = ({type='text', placeholder, onChange, size='large', defaultValue = '', icon, onClick}) => {
  return(
    <div className='textinput'>
    <input className={`textinput--${size}`} type={type} placeholder={placeholder} onChange={onChange} defaultValue={defaultValue} onClick={onClick} />
    <div className='textinput--icon'>
      {icon}
    </div>
    </div>
  )
}

export default TextInput;