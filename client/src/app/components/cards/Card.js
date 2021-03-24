import React from 'react';

const Card = ({children, extraClass=''}) => {
  return(
    <div className={`card ${extraClass}`}>
      {children}
    </div>
  )
}

export default Card;