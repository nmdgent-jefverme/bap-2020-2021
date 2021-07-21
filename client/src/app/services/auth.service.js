import { default as React, useContext, createContext, useState } from 'react';
import { useSessionstorage } from './sessionstorage.service';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const { getUser, setUser } = useSessionstorage();
  const [ currentUser, setCurrentUser ] = useState(getUser());

  const BASE_URL = '';

  const signIn = async (email, password) => {
    const url = `${BASE_URL}/user/login`;
    const body = {
      email,
      password
    };

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: 'follow'
    };
    const response = await fetch(`${url}`, options);
    console.log(response);
    const user = await response.json();
    updateUserObject(user);
    return user;
  }

  const register = async (name, email, password, c_password) => {
    const url = `${BASE_URL}/user/register`;
    const body = {
      name,
      email,
      password,
      c_password,
      instruments: ''
    };

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: 'follow'
    };
    const response = await fetch(`${url}`, options);
    const user = await response.json();
    updateUserObject(user);
    return user;
  }

  const updateUser = async (userId, token, name, email, instruments) => {
    const url = `${BASE_URL}/user/edit/${userId}`;
    const body = {
      name,
      email,
      instruments
    };

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    const options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: 'follow'
    };
    const response = await fetch(`${url}`, options);
    const user = await response.json();
    updateUserObject(user);
    return user;
  }

  const updateUserObject = (user) => {
    const userObject = {
      id: user.data.id,
      email: user.data.email,
      name: user.data.name,
      instruments: user.data.instruments,
      token: user.data.token
    };
    setCurrentUser(userObject);
    setUser(userObject);
  }

  const signOut = () => {
    setCurrentUser(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      register,
      setCurrentUser,
      signIn,
      signOut,
      updateUser
    }} >
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthProvider,
  useAuth,
}