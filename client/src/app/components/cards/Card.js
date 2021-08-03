import React from 'react';

const Card = ({children, extraClass='', onDragStart, onDragEnter, onDragEnd, style, onDragExit, canDrag = false}) => {
  return(
    <div className={`card ${extraClass}`} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragEnter={onDragEnter} onDragLeave={onDragExit} draggable={canDrag} style={style} >
      {children}
    </div>
  )
}

export default Card;