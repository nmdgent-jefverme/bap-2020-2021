import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Navigation, PageTitle, TextInput } from '../components';

import * as Routes from '../routes';
import { useApi, useAuth } from '../services';

const AddProjectPage = () => {
  const [ title, setTitle ] = useState();
  const { createProject } = useApi();
  const { currentUser } = useAuth();
  let history = useHistory();

  const handleCreate = async () => {
    const result = await createProject(currentUser.token, currentUser.id, title);
    if(result.success) history.push(Routes.PROJECT_PAGE.replace(':id', result.data.id));
  }

  return(
    <>
    <Navigation activePage='projects'/>
    <PageTitle title='Project aanmaken' hasButton={false}/>
    <div className='content'>
      <div className='addproject'>
        <TextInput placeholder='Titel project' onChange={(ev) => setTitle(ev.target.value)} />
        <Button placeholder='Project aanmaken' onClick={handleCreate} />
      </div>
    </div>
    </>
  )
}

export default AddProjectPage;