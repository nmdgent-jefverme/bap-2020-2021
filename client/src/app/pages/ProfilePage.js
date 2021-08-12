import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

import {
  Card,
  Errors,
  Navigation,
  PageTitle,
  PopupEdit,
} from '../components';
import * as Routes from '../routes';

import profileIcon from '../assets/profileIcon.png';
import { useApi, useAuth } from '../services';

const ProfilePage = () => {
  const { currentUser, updateUserProfilePicture } = useAuth();
  const { getProjectsByUserId, uploadFile } = useApi();
  const [ userProjects, setUserProjects ] = useState();
  const [ file, setFile ] = useState(false);
  const [ errors, setErrors ] = useState();
  const [ displayError, setDisplayError ] = useState(false);

  const extentions = [ 'png', 'jpg', 'jpeg', 'gif' ];

  const initFetch = useCallback(
    () => {
      const fetchItems = async () => {
        let tempProjects = await getProjectsByUserId(currentUser.token, currentUser.id);
        tempProjects = tempProjects.sort((a, b) => {
          return(new Date(b.project.updated_at) - new Date(a.project.updated_at));
        });
        setUserProjects(tempProjects.slice(0, 3));
      }
      fetchItems();
    },
    [getProjectsByUserId, currentUser],
  );
  
  useEffect(() => {
		initFetch();
  }, [initFetch]);

  const handleUpload = async () => {
    if(!file) {
      setDisplayError(true);
      setErrors([ 'File is required' ]);
      return 1;
    } else {
      console.log(file.type.split('/').pop());
      const extension = file.type.split('/').pop();
      if (!extentions.includes(extension)) {
        setDisplayError(true);
        setErrors([ 'Wrong extention. Allowed extentions are: png, jpg, jpeg, gif' ]);
        return 1;
      } else {
        const data = new FormData();
        data.append('file', file);
        const id = await uploadFile(data, currentUser.token);
        if(id !== null) {
          const result = await updateUserProfilePicture(id);
          if (result.success) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  }

  return(
    <>
      <Navigation activePage='profile'/>
      <PageTitle title='Mijn account' hasButton={false} />
      <div className='content'>
        <Card extraClass='profilepage--profilecard'>
          <div className='profilepage--image-container'>
            {
              currentUser.picture ?
              <img src={`https://api.jefverme-cms.be/storage/files/${currentUser.picture.name}`} alt='Profile icon' className='profilepage--picture' />
              :
              <img src={profileIcon} alt='Profile icon' className='profilepage--image' />
            }
            <PopupEdit
              onSubmit={handleUpload}
              title='Profielfoto'
            >
              <input className='mb-4' type='file' onChange={(ev) => setFile(ev.target.files[0])}/>
              <div className='w-75'>
                {
                  displayError && <Errors errors={errors} message='Er is een fout opgetreden:'/>
                }
              </div>
            </PopupEdit>
          </div>
          <div className='profilepage--info-container'>
            <div className='d-flex align-items-center justify-content-between'>
              <h3 className="pb-4">Mijn profiel</h3>
              <Link to={Routes.PROFILE_EDIT} className="pb-4"><FiEdit className='profilepage--edit'/></Link>
            </div>
            {
              !!currentUser &&
              <div>
                <p className="pb-2">Naam: {currentUser.name}</p>
                <p className="pb-2">Email: {currentUser.email}</p> 
                <p>Instrumenten: {currentUser.instruments}</p>
              </div>
            }
          </div>
        </Card>
        <div className='profilepage--overview'>
          <Card extraClass='profilepage--overviewcard'>
            <h3>Mijn projecten</h3>
            {
              userProjects && userProjects.map((project, key) => {return <Link key={key} className='profilepage--overviewcard--link' to={Routes.PROJECT_PAGE.replace(':id', project.project.id)}>{project.project.title}</Link>})
            }
            <Link className='profilepage--overviewcard--link' to={Routes.PROJECTS}>&gt;&gt; Al mijn projecten</Link>
          </Card>
        </div>
      </div>
    </>
  )
}

export default ProfilePage;