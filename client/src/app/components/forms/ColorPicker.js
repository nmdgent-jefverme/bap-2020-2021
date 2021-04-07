import React from 'react';

const ColorPicker = ({colors, activeColor, setSelectedColor}) => {
  return(
    <div className='colorpicker'>
      {
        colors.map((color, key) => 
          <div 
            key={key} 
            className={`colorpicker--color${activeColor === color.id ? '__selected' : ''} color_${color.id}`} 
            onClick={() => setSelectedColor(color.id)}
          />
        )
      }
    </div>
  )
}

export default ColorPicker;