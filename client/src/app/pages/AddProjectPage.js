import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Errors, Message, Navigation, PageTitle, TextInput } from '../components';
import { CgCloseO } from 'react-icons/cg';

import * as Routes from '../routes';
import { useApi, useAuth } from '../services';

const AddProjectPage = () => {
  const [ title, setTitle ] = useState('');
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ displayMessageAnimation, setDisplayMessageAnimation ] = useState(false);
  const [ displayError, setDisplayError ] = useState(false);
  const [ errors, setErrors ] = useState([]);
  const { createProject } = useApi();
  const { currentUser } = useAuth();
  let history = useHistory();

  const handleCreate = async () => {
    if(title.trim() === '') {
      setDisplayError(true);
      setErrors(['The title field is required']);
    } else {
      setDisplayError(false);
      setErrors([]);
      const result = await createProject(currentUser.token, currentUser.id, title);
      if(result.success) history.push(Routes.PROJECT_PAGE.replace(':id', result.data.id));
      else {
        setDisplayMessage(true);
        setDisplayMessageAnimation(true);
        window.setTimeout(() => {
          setDisplayMessageAnimation(false);
        }, 2000)
        window.setTimeout(() => {
          setDisplayMessage(false);
        }, 4000)
      }
    }
  }

  return(
    <>
    <Navigation activePage='projects'/>
    <PageTitle title='Project aanmaken' hasButton={false}/>
    <div className='content'>
      <div className='addproject'>
        <TextInput placeholder='Titel project' onChange={(ev) => setTitle(ev.target.value)} />
        <Button placeholder='Project aanmaken' onClick={handleCreate} />
        { displayError ? <Errors message='Er is een fout opgetreden:' errors={errors}/> : null }
      </div>
      {
          displayMessage && 
          <Message 
            message='Fout bij toevoegen van een project'
            display={displayMessageAnimation}
            icon={<span className='error'><CgCloseO /></span>}
          />
        }
    </div>
    </>
  )
}

export default AddProjectPage;