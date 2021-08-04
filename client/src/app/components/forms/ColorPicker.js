import React, { useState } from 'react';
import { HuePicker } from 'react-color'
import TextInput from './TextInput';

const ColorPicker = ({colors, activeColor, setSelectedColor}) => {
  const [ newColor, setNewColor ] = useState('fff');
  return(
    <div className='colorpicker'>
      <div className='colorpicker--colors'>
        {
          colors.map((color, key) => 
            <div 
              key={key} 
              className={`colorpicker--color${activeColor === color.id ? '__selected' : ''}`} 
              onClick={() => setSelectedColor(color.id)}
              style={{backgroundColor: color.color_value}}
            />
          )
        }
        <div
          className={`colorpicker--color${isNaN(activeColor) ? '__selected' : ''}`} 
          onClick={() => setSelectedColor(newColor)}
          style={{backgroundColor: newColor}}
        />
        <div>
        </div>
      </div>
      <HuePicker color={newColor} onChange={(color) => {setNewColor(color.hex); setSelectedColor(color.hex);}} />
    </div>
  )
}

export default ColorPicker;