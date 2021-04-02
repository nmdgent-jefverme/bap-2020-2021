import React from 'react';
import { Button } from '../forms';

const PageTitle = ({title = '', hasButton = true, buttonAction}) => {
  return(
    <div className='pagetitle'>
      <h1>{title}</h1>
      {
        hasButton ?
        <>
          <div className='pagetitle--seperator'/>
          <Button placeholder='+' size='add' onClick={buttonAction}/> 
        </>: null
      }
    </div>
  )
}

export default PageTitle;