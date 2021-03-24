import React from 'react';

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
        <Card>
          <h2>Mijn profiel</h2>
        </Card>
      </div>
    </>
  )
}

export default ProfilePage;