import React, { useState } from 'react';
import { TextInput } from '../forms';
import { PopupInvite } from '../popup';

const PageTitle = ({title = '', info = false, author, date, inviteBtn = false, projectId = 0}) => {
  return(
    <div className='pagetitle'>
      {
        info && 
        <div className='pagetitle--inofo'>
          <p>Auteur: {author}</p>
          <p>Laatst bewerkt: {date}</p>
        </div>
      }
      <div className='pagetitle--title'>
        <h1>{title}</h1>
        {
          inviteBtn &&
          <PopupInvite projectId={projectId} />
        }
      </div>
    </div>
  )
}

export default PageTitle;