import React, { useEffect, useState } from 'react';
import { Button, Navigation, PageTitle, TextInput, Errors } from '../components';
import { useHistory } from 'react-router';

import * as Routes from '../routes';
import { useAuth } from '../services';
import { getTokenFromUrl } from '../utilities';
import { CgRename } from 'react-icons/cg';

const ProfileEditPage = () => {
  const { currentUser, updateUser } = useAuth();
  const [ newEmail, setNewEmail ] = useState(currentUser.email);
  const [ newName, setNewName ] = useState(currentUser.name);
  const [ newInstruments, setNewInstruments ] = useState(currentUser.instruments);
  const [ displayError, setDisplayError ] = useState(false);
  const [ errors, setErrors ] = useState([]);
  const [token, setToken] = useState();

  let history = useHistory();

  const handleUpdate = async () => {
    const result = await updateUser(currentUser.id, currentUser.token, newName, newEmail, newInstruments, currentUser.picture.id);
    if (result.success) {
      history.push(Routes.PROFILE)
    } else {
      const temp = [];
      setDisplayError(true);
      Object.keys(result.data).forEach((key) => {
        temp.push(result.data[key][0]);
      });
      setErrors(temp);
    }
  }

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      localStorage.setItem('spotifyToken', _token);
    }
  }, [token]);

  return(
    <>
      <Navigation activePage='profile'/>
      <PageTitle title='Profiel bewerken'/>
      <div className='content'>
        <div className='profile-edit'>
          <TextInput placeholder='Naam bewerken' defaultValue={currentUser.name} onChange={(ev) =>  setNewName(ev.target.value)} icon={<CgRename />} />
          <TextInput placeholder='Email bewerken' defaultValue={currentUser.email} onChange={(ev) =>  setNewEmail(ev.target.value)} icon='@' />
          <TextInput placeholder='Instrumenten bewerken' defaultValue={currentUser.instruments} onChange={(ev) =>  setNewInstruments(ev.target.value)} icon={<CgRename />} />
          <Button placeholder='Opslaan' onClick={handleUpdate}/>
          { displayError ? <Errors message='Er is een fout opgetreden:' errors={errors}/> : null }
        </div>
      </div>
    </>
  )
}

export default ProfileEditPage;