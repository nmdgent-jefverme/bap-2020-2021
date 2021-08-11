import React, { useState } from 'react';
import * as Routes from '../routes';

import Logo from '../assets/logo.svg';

import { Button, Errors, TextInput } from '../components';
import { useAuth } from '../services';
import { useHistory } from 'react-router';

const RegisterPage = () => {
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ passwordRepeat, setPasswordRepeat ] = useState();
  const [ displayError, setDisplayError ] = useState(false);
  const [ errors, setErrors ] = useState([]);
  const { register } = useAuth();
  let history = useHistory();

  const handleRegister = async () => {
    const result = await register(name, email, password, passwordRepeat);
    console.log(result.success);
    if(!result.success) {
      const temp = [];
      setDisplayError(true);
      Object.keys(result.data).forEach((key) => {
        temp.push(result.data[key][0]);
      });
      setErrors(temp);
    } else {
      setDisplayError(false);
      history.push(Routes.PROFILE)
    }
  }

  return(
    <div className='loginpage'>
      <div className='loginpage--imagesection'>
        <img src={Logo} alt='Logo' className='loginpage--logo'/>
        <span className='loginpage--catchphrase'>Welcome to MxrBoard, the platform to collect all your inspiration and Ideas.</span>
      </div>
      <div className='loginpage--formsection'>
        <div className='loginpage--form'>
          <img src={Logo} alt='Logo' className='loginpage--formlogo'/>
          <h2 className='loginpage--title'>Registeren</h2>
          <TextInput placeholder='Naam' size='large' onChange={(ev) => setName(ev.target.value)} />
          <TextInput placeholder='Email' size='large' onChange={(ev) => setEmail(ev.target.value)} />
          <TextInput type='password' placeholder='Wachtwoord' size='large' onChange={(ev) => setPassword(ev.target.value)}  />
          <TextInput type='password' placeholder='Wachtwoord herhalen' size='large' onChange={(ev) => setPasswordRepeat(ev.target.value)} />
          <Button placeholder='Registreren' size='large' onClick={handleRegister}/>
          { displayError ? <Errors message='Er is een fout opgetreden:' errors={errors}/> : null }
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;