import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useAuth } from '../services';

import Logo from '../assets/logo.svg';

import { 
  Button,
  Errors,
  TextInput 
} from '../components';

import * as Routes from '../routes';

const LoginPage = () => {
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const { signIn } = useAuth();
  const [ displayError, setDisplayError ] = useState(false);
  const [ errors, setErrors ] = useState([]);
  const history = useHistory();

  const handleLogin = async () => {
    const result = await signIn(email, password);
    if (result.success) {
      setDisplayError(false);
      history.push(Routes.PROFILE);
    } else {
      const temp = [];
      setDisplayError(true);
      Object.keys(result.data).forEach((key) => {
        temp.push(result.data[key]);
      });
      setErrors(temp);
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
          <h2 className='loginpage--title'>Login</h2>
          <TextInput placeholder='Email' size='large' onChange={(e) => setEmail(e.target.value)}/>
          <TextInput type='password' placeholder='Wachtwoord' size='large' onChange={(e) => setPassword(e.target.value)}/>
          <Button placeholder='Login' size='large' onClick={handleLogin}/>
          { displayError ? <Errors message='Er is een fout opgetreden:' errors={errors}/> : null }
          <div className='loginpage--seperator'/>
          <span>Geen account? <Link className='loginpage--link' to={Routes.REGISTER}>Registreer hier</Link></span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;