import React from 'react';

import {
  Card,
  Navigation,
  PageTitle
} from '../components';

const ProjectsPage = () => {
  return(
    <>
      <Navigation activePage='projects'/>
      <PageTitle title='Mijn Projecten'/>
      <div className='container'>
        <Card>
          <h2>Project titel</h2>
        </Card>
      </div>
    </>
  )
}

export default ProjectsPage;