import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

import {
  Card,
  Navigation,
  PageTitle
} from '../components';
import * as Routes from '../routes';

import profileIcon from '../assets/profileIcon.png';
import { useAuth } from '../services';

const ProfilePage = () => {
  const { currentUser } = useAuth();

  const [ userProjects ] = useState([
    {
      title: 'Project 1',
      slug: 'project-1'
    },
    {
      title: 'Project 2',
      slug: 'project-2'
    },
    {
      title: 'Project 3',
      slug: 'project-3'
    }
  ])

  return(
    <>
      <Navigation activePage='profile'/>
      <PageTitle title='Mijn account'/>
      <div className='content'>
        <Card extraClass='profilepage--profilecard'>
          <div className='profilepage--image-container'>
            <img src={profileIcon} alt='Profile icon' className='profilepage--image' />
          </div>
          <div className='profilepage--info-container'>
            <div className='d-flex align-items-center justify-content-between'>
              <h3>Mijn profiel</h3>
              <Link to={Routes.PROFILE_EDIT}><FiEdit className='profilepage--edit'/></Link>
            </div>
            {
              !!currentUser &&
              <div>
                <p>Naam: {currentUser.name}</p>
                <p>Email: {currentUser.email}</p> 
                <p>Instrumenten: {currentUser.instruments}</p>
              </div>
            }
          </div>
        </Card>
        <div className='profilepage--overview'>
          <Card extraClass='profilepage--overviewcard'>
            <h3>Mijn projecten</h3>
            {
              userProjects && userProjects.map((project, key) => <Link key={key} className='profilepage--overviewcard--link' to={Routes.PROJECT_PAGE.replace(':slug', project.slug)}>{project.title}</Link>)
            }
            <Link className='profilepage--overviewcard--link' to={Routes.PROJECTS}>&gt;&gt; Al mijn projecten</Link>
          </Card>
          <Card extraClass='profilepage--overviewcard'>
            <h3>Mijn bands</h3>
          </Card>
        </div>
      </div>
    </>
  )
}

export default ProfilePage;