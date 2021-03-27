import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import * as Routes from '../routes';

import {
  Card,
  Navigation,
  PageTitle
} from '../components';

const ProjectsPage = () => {
  const [ projects ] = useState([
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
    },
  ]);
  return(
    <>
      <Navigation activePage='projects'/>
      <PageTitle title='Mijn Projecten'/>
      <div className='content'>
        <div className='projectspage'>
          {
            !!projects && projects.map((project, key) =>   
              <Card key={key} extraClass='projectspage--projectcard'>
                <Link to={Routes.PROJECT_PAGE.replace(':slug', project.slug)}><h3>{project.title}</h3></Link>
              </Card>
            )
          }
        </div>
      </div>
    </>
  )
}

export default ProjectsPage;