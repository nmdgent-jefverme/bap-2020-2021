import { default as React, useContext, createContext, } from 'react';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  //const BASE_URL = `${apiConfig.baseURL}`;

  return (
    <ApiContext.Provider value={{}}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
};