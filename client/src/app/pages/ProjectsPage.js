import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CgRename } from 'react-icons/cg';

import * as Routes from '../routes';

import {
  Button,
  Card,
  Errors,
  Message,
  Navigation,
  PageTitle,
  PopupDelete,
  PopupEdit,
  TextInput
} from '../components';
import { useApi, useAuth } from '../services';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { CgCloseO } from 'react-icons/cg';

const ProjectsPage = () => {
  const [ projects, setProjects ] = useState();
  const [ title, setTitle ] = useState(false);
  const [ errors, setErrors ] = useState();
  const [ displayError, setDisplayError ] = useState(false);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ displayMessageAnimation, setDisplayMessageAnimation ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ icon, setIcon ] = useState();
  const { getProjectsByUserId, updateProject, removeProject } = useApi();
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
    if(title.trim() === '') {
      setDisplayError(true);
      setErrors(['The title field is required.']);
      return 1;
    } else {
      const result = await updateProject(currentUser.token, id, title);
      setDisplayError(false);
      setErrors([]);
      if (result.success) {
        initFetch();
        return true;
      } else {
        return false;
      }
    }
  }

  const handleRemove = async (id) => {
    const result = await removeProject(currentUser.token, id);
    if (result.success) {
      setMessage('Project verwijderd');
      setIcon(<span className='success'><AiOutlineCheckCircle /></span>);
      initFetch();
    } else {
      setMessage('Fout bij verwijderen');
      setIcon(<span className='error'><CgCloseO /></span>);
    }
    setDisplayMessage(true);
    setDisplayMessageAnimation(true);
    window.setTimeout(() => {
      setDisplayMessageAnimation(false);
    }, 2000)
    window.setTimeout(() => {
      setDisplayMessage(false);
    }, 4000)
  }

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
                    <div className='ml-4'>
                      <PopupDelete title={`${project.project.title} verwijderen?`} onSubmit={() => handleRemove(project.project_id)}/>
                      <PopupEdit title={project.project.title} className='projectspage--projectcard--icon' onSubmit={(ev) => handleUpdate(project.project_id, ev)} >
                        <TextInput placeholder='Titel project' defaultValue={project.project.title} icon={<CgRename />} onChange={(ev) => setTitle(ev.target.value)} />
                        {
                          displayError && <Errors errors={errors} message='Er is een fout opgetreden:'/>
                        }
                      </PopupEdit>
                    </div>
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
      <div>
        {
          displayMessage && 
          <Message 
            message={message}
            display={displayMessageAnimation}
            icon={icon}
          />
        }
      </div>
    </>
  )
}

export default ProjectsPage;