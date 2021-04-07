import React from 'react';

const PageTitle = ({title = ''}) => {
  return(
    <div className='pagetitle'>
      <h1>{title}</h1>
    </div>
  )
}

export default PageTitle;