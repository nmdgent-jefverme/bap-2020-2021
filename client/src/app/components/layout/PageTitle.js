import React, { useState } from 'react';
import { TextInput } from '../forms';
import { PopupInvite } from '../popup';
import { CgCloseO } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import * as Routes from '../../routes';

const PageTitle = ({title = '', info = false, author, date, inviteBtn = false, projectId = 0, closeBtn = false}) => {
  return(
    <div className='pagetitle'>
      {
        info && 
        <div className='pagetitle--inofo'>
          <p>Auteur: {author}</p>
          <p>Laatst bewerkt: {date}</p>
        </div>
      }
      {
        closeBtn && 
        <div className='pagetitle--closebtn'>
          <Link to={Routes.PROJECT_PAGE.replace(':id', projectId)}>
            <CgCloseO />
          </Link>
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