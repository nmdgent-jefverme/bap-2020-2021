import React from 'react';

const PageTitle = ({title = '', info = false, author, date}) => {
  return(
    <div className='pagetitle'>
      {
        info && 
        <div className='pagetitle--inofo'>
          <p>Auteur: {author}</p>
          <p>Laatst bewerkt: {date}</p>
        </div>
      }
      <h1>{title}</h1>
    </div>
  )
}

export default PageTitle;