import React, { useEffect, useState } from 'react';
import { Button, Navigation, PageTitle, TextInput } from '../components';
import { useHistory } from 'react-router';

import * as Routes from '../routes';
import { useAuth } from '../services';
import { loginUrl, getTokenFromUrl } from '../utilities';

const ProfileEditPage = () => {
  const { currentUser, updateUser } = useAuth();
  const [ newEmail, setNewEmail ] = useState(currentUser.email);
  const [ newName, setNewName ] = useState(currentUser.name);
  const [ newInstruments, setNewInstruments ] = useState(currentUser.instruments);
  const [token, setToken] = useState();

  let history = useHistory();

  const handleUpdate = async () => {
    const result = await updateUser(currentUser.id, currentUser.token, newName, newEmail, newInstruments);
    if (result.success) {
      history.push(Routes.PROFILE)
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
          <TextInput placeholder='Naam bewerken' defaultValue={currentUser.name} onChange={(ev) =>  setNewName(ev.target.value)} />
          <TextInput placeholder='Email bewerken' defaultValue={currentUser.email} onChange={(ev) =>  setNewEmail(ev.target.value)} />
          <TextInput placeholder='Instrumenten bewerken' defaultValue={currentUser.instruments} onChange={(ev) =>  setNewInstruments(ev.target.value)} />
          <a href={loginUrl} className='profile-edit--spotify-btn'>Link spotify</a>
          <Button placeholder='Opslaan' onClick={handleUpdate}/>
        </div>
      </div>
    </>
  )
}

export default ProfileEditPage;