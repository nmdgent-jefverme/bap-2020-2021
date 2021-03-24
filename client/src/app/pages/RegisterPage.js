import React from 'react';

import Logo from '../assets/logo.svg';

import { Button, TextInput } from '../components';

const RegisterPage = () => {
  return(
    <div className='loginpage'>
      <div className='loginpage--imagesection'>
        <img src={Logo} alt='Logo' className='loginpage--logo'/>
        <span className='loginpage--catchphrase'>Welcome to MxrBoard, the platform to collect all your inspiration and Ideas.</span>
      </div>
      <div className='loginpage--formsection'>
        <h2 className='loginpage--title'>Registeren</h2>
        <TextInput placeholder='Email' size='medium'/>
        <TextInput placeholder='Wachtwoord' size='medium'/>
        <TextInput placeholder='Wachtwoord herhalen' size='medium'/>
        <Button placeholder='Registreren' size='medium'/>
      </div>
    </div>
  )
}

export default RegisterPage;