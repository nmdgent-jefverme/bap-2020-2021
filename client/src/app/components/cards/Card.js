import React from 'react';

const Card = ({children, extraClass='', onDragStart, onDragEnter, onDragEnd}) => {
  return(
    <div className={`card ${extraClass}`} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragEnter={onDragEnter} draggable >
      {children}
    </div>
  )
}

export default Card;