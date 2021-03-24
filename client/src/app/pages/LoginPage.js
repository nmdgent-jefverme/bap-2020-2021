import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useAuth } from '../services';

import Logo from '../assets/logo.svg';

import { Button, TextInput } from '../components';

import * as Routes from '../routes';

const LoginPage = () => {
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const { signInLocal } = useAuth();
  const history = useHistory();

  const handleLogin = () => {
    signInLocal(email, password);
    history.push(Routes.PROFILE);
  }

  return(
    <div className='loginpage'>
      <div className='loginpage--imagesection'>
        <img src={Logo} alt='Logo' className='loginpage--logo'/>
        <span className='loginpage--catchphrase'>Welcome to MxrBoard, the platform to collect all your inspiration and Ideas.</span>
      </div>
      <div className='loginpage--formsection'>
        <h2 className='loginpage--title'>Login</h2>
        <TextInput placeholder='Email' size='medium' onChange={(e) => setEmail(e.target.value)}/>
        <TextInput type='password' placeholder='Wachtwoord' size='medium' onChange={(e) => setPassword(e.target.value)}/>
        <Button placeholder='Login' size='medium' onClick={handleLogin}/>
        <div className='loginpage--seperator'/>
        <span>Geen account? <Link className='loginpage--link' to={Routes.REGISTER}>Registreer hier</Link></span>
      </div>
    </div>
  )
}

export default LoginPage;