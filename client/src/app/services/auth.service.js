import { default as React, useContext, createContext, useState } from 'react';
import { useSessionstorage } from './sessionstorage.service';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const [ currentUser, setCurrentUser ] = useState();
  const { setUser } = useSessionstorage();

  const signInLocal = async (username, password) => {
    setCurrentUser({
      username
    });
    setUser({
      username
    })
  }

  const signOut = () => {
    setCurrentUser(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      signInLocal,
      currentUser,
      setCurrentUser,
      signOut,
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