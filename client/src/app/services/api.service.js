import { default as React, useContext, createContext, } from 'react';
import axios from 'axios';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const getAllProjects = async (token) => {
    const url = `${BASE_URL}/projects`;

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    const options = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const response = await fetch(`${url}`, options);
    const projects = await response.json();
    return projects;
  }

  const getProjectById = async (token, id) => {
    const url = `${BASE_URL}/projects/${id}`;

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    const options = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const response = await fetch(`${url}`, options);
    const project = await response.json();
    return project;
  }

  const getProjectsByUserId = async (token, id) => {
    const url = `${BASE_URL}/user/projects/${id}`;

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    const options = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const response = await fetch(`${url}`, options);
    const projects = await response.json();
    const groupedProjects = Object.keys(projects.data).map((key) => {
      return projects.data[key][0];
    });
    return groupedProjects;
  }

  const getIdeaTypes = async (token) => {
    const url = `${BASE_URL}/idea_types`;

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    const options = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const response = await fetch(`${url}`, options);
    const types = await response.json();
    return types.data;
  }

  const createProject = async (token, user_id, title) => {
    const url = `${BASE_URL}/projects`;
    const body = {
      title,
      user_id,
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
    const project = await response.json();
    return project;
  }

  const uploadFile = async (file, token) => {
    const url = `${BASE_URL}/file_upload`;
    const myHeaders = {
      'Authorization': 'Bearer ' + token
    }

    const body = {
      'file': file,
      'terst': 'test'
    }

    const options = {
      method: 'POST',
      headers: myHeaders,
      body: body,
      redirect: 'follow',
    };
    console.log(options);
    const response = await fetch(url, options);
    const upLoadedFile = await response.json();
    console.log(upLoadedFile)
    return upLoadedFile;
    /* const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
      file: file
    };
    console.log(bodyParameters);
    const result = await axios.post(`${BASE_URL}/file_upload`, bodyParameters, config);
    console.log(result); */
  }

  return (
    <ApiContext.Provider value={{
      createProject,
      getAllProjects,
      getIdeaTypes,
      getProjectById,
      getProjectsByUserId,
      uploadFile
    }}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
};