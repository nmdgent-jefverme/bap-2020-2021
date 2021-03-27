import React from 'react';
import { useHistory } from 'react-router';
import { Button, Navigation, PageTitle, TextInput } from '../components';

import * as Routes from '../routes';

const AddProjectPage = () => {
  let history = useHistory();

  return(
    <>
    <Navigation activePage='projects'/>
    <PageTitle title='Project aanmaken' />
    <div className='content'>
      <div className='addproject'>
        <TextInput placeholder='Titel project'/>
        <Button placeholder='Project aanmaken' onClick={() => history.push(Routes.PROJECT_PAGE)} />
      </div>
    </div>
    </>
  )
}

export default AddProjectPage;