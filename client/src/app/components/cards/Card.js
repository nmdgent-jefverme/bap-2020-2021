import React from 'react';

const Card = ({children, extraClass='', onDragEnter, onDragExit}) => {
  return(
    <div className={`card ${extraClass}`} onDragEnter={onDragEnter} onDragLeave={onDragExit} >
      {children}
    </div>
  )
}

export default Card;