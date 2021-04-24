import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

import {
  Card,
  Navigation,
  PageTitle
} from '../components';
import * as Routes from '../routes';

import profileIcon from '../assets/profileIcon.png';
import { useApi, useAuth } from '../services';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { getProjectsByUserId } = useApi();
  const [ userProjects, setUserProjects ] = useState()

  const initFetch = useCallback(
    () => {
      const fetchItems = async () => {
        let tempProjects = await getProjectsByUserId(currentUser.token, currentUser.id);
        console.log(tempProjects);
        tempProjects = tempProjects.sort((a, b) => {
          return(new Date(b.project.updated_at) - new Date(a.project.updated_at));
        });
        setUserProjects(tempProjects.slice(0, 3));
      }
      fetchItems();
    },
    [getProjectsByUserId, currentUser],
  );
  
  useEffect(() => {
		initFetch();
  }, [initFetch]);

  return(
    <>
      <Navigation activePage='profile'/>
      <PageTitle title='Mijn account' hasButton={false} />
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
              userProjects && userProjects.map((project, key) => {return <Link key={key} className='profilepage--overviewcard--link' to={Routes.PROJECT_PAGE.replace(':id', project.project.id)}>{project.project.title}</Link>})
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