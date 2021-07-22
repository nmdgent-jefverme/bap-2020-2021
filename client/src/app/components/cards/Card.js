import React from 'react';

const Card = ({children, extraClass='', onDragStart, onDragEnter, onDragEnd, style}) => {
  return(
    <div className={`card ${extraClass}`} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragEnter={onDragEnter} /*draggable*/ style={style} >
      {children}
    </div>
  )
}

export default Card;