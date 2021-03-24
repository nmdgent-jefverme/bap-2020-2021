import React from 'react';

import profileIcon from '../assets/profileIcon.png';

import {
  Card,
  Navigation,
  PageTitle
} from '../components';

const ProfilePage = () => {
  return(
    <>
      <Navigation activePage='profile'/>
      <PageTitle title='Mijn account'/>
      <div className='container'>
        <Card extraClass='profilepage--overviewcard'>
          <div className='profilepage--image-container'>
            <img src={profileIcon} alt='Profile icon' className='profilepage--image' />
          </div>
          <h3>Mijn profiel</h3>
        </Card>
      </div>
    </>
  )
}

export default ProfilePage;