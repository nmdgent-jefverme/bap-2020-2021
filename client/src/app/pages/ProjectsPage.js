import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CgRename } from 'react-icons/cg';

import * as Routes from '../routes';

import {
  Button,
  Card,
  Errors,
  Navigation,
  PageTitle,
  PopupEdit,
  TextInput
} from '../components';
import { useApi, useAuth } from '../services';

const ProjectsPage = () => {
  const [ projects, setProjects ] = useState();
  const [ title, setTitle ] = useState(false);
  const [ errors, setErrors ] = useState();
  const [ displayError, setDisplayError ] = useState(false);
  const { getProjectsByUserId, updateProject } = useApi();
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
  }, [ initFetch ]);

  const handleUpdate = async (id, ev) => {
    await updateProject(currentUser.token, id, title);
    initFetch();
    return true;
  }

  useEffect(() => {
    if(title.length >= 0) {
      if(title.trim() === '') {
        setDisplayError(true);
        setErrors(['The title field is required.'])
      } else {
        setDisplayError(false);
        setErrors(null)
      }
    }
  }, [ title ])

  return(
    <>
      <Navigation activePage='projects'/>
      <PageTitle title='Mijn Projecten' buttonAction={() => history.push(Routes.PROJECTS_CREATE)} />
      <Link to={Routes.PROJECTS_CREATE}><Button placeholder='+' size='add'/></Link>
      <div className='content'>
        <div className='projectspage'>
          {
            !!projects && projects.map((project, key) =>   
              <Card key={key} extraClass='projectspage--projectcard'>
                <div className='d-flex align-items-center'>
                  <Link to={Routes.PROJECT_PAGE.replace(':id', project.project_id)}><h3>{project.project.title}</h3></Link>
                  {
                    project.project.author_id === currentUser.id &&
                    <PopupEdit title={project.project.title} className='projectspage--projectcard--icon' onSubmit={(ev) => handleUpdate(project.project_id, ev)} buttonDisabled={displayError} >
                      <TextInput placeholder='Titel project' defaultValue={project.project.title} icon={<CgRename />} onChange={(ev) => setTitle(ev.target.value)} />
                      {
                        displayError && <Errors errors={errors} message='Er is een fout opgetreden:'/>
                      }
                    </PopupEdit>
                  }
                </div>
                <div className='projectspage--projectcard--info'>
                  <p className='projectspage--projectcard--text'>Auteur: {project.project.author.name}</p>
                  <p className='projectspage--projectcard--text'>Laatste bewerking: {new Date(project.project.updated_at).toLocaleDateString()}</p>
                </div>
              </Card>
            )
          }
        </div>
      </div>
    </>
  )
}

export default ProjectsPage;