import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as Routes from '../routes';

import {
  Card,
  Navigation,
  PageTitle
} from '../components';
import { useApi, useAuth } from '../services';

const ProjectsPage = () => {
  const [ projects, setProjects ] = useState();
  const { getProjectsByUserId } = useApi();
  const { currentUser } = useAuth();
  let history = useHistory();

  const initFetch = useCallback(() => {
    const fetchItems = async () => {
      let result = await getProjectsByUserId(currentUser.token, currentUser.id);
      result = result.sort((a, b) => {
        return(new Date(b.project.updated_at) - new Date(a.project.updated_at));
      });
      setProjects(result);
    };
    fetchItems();
  }, [ getProjectsByUserId, currentUser ])

  useEffect(() => {
    initFetch();
  }, [ initFetch ])
  return(
    <>
      <Navigation activePage='projects'/>
      <PageTitle title='Mijn Projecten' buttonAction={() => history.push(Routes.PROJECTS_CREATE)} />
      <div className='content'>
        <div className='projectspage'>
          {
            !!projects && projects.map((project, key) =>   
              <Card key={key} extraClass='projectspage--projectcard'>
                <Link to={Routes.PROJECT_PAGE.replace(':id', project.project_id)}><h3>{project.project.title}</h3></Link>
              </Card>
            )
          }
        </div>
      </div>
    </>
  )
}

export default ProjectsPage;