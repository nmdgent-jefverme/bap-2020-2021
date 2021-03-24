import { default as React, useContext, createContext } from 'react';

const SessionstorageContext = createContext();
const useSessionstorage = () => useContext(SessionstorageContext);

const SessionstorageProvider = ({children}) => {
  const STORAGE = window.sessionStorage;

  const getUser = () => {
    return JSON.parse(STORAGE.getItem('user'));
  }

  const setUser = (user) => {
    STORAGE.setItem('user', JSON.stringify(user));
  }

  const getArray = (id) => {
    return JSON.parse(STORAGE.getItem(id));
  }

  const setArray = (id, content) => {
    STORAGE.setItem(id, JSON.stringify(content));
  }

  return (
    <SessionstorageContext.Provider value={{
      getUser,
      getArray,
      setArray,
      setUser
    }} >
      {children}
    </SessionstorageContext.Provider>
  )
}

export {
  SessionstorageContext,
  SessionstorageProvider,
  useSessionstorage,
}