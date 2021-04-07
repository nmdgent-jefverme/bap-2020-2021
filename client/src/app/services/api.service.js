import { default as React, useContext, createContext, } from 'react';

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

  const updateProject = async (token, id, title) => {
    const url = `${BASE_URL}/projects/${id}`;
    const body = {
      title
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

  const getAllColors = async (token) => {
    const url = `${BASE_URL}/colors`;

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

  const addPile = async (token, project_id, color_id, name) => {
    const url = `${BASE_URL}/piles/add_pile`;
    const body = {
      name,
      color_id,
      project_id
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
    const pile = await response.json();
    return pile.data;
  }

  const updatePile = async (token, id, name, color_id) => {
    const url = `${BASE_URL}/pile/${id}`;
    const body = {
      name,
      color_id,
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
    const pile = await response.json();
    return pile;
  }

  const addIdea = async (token, project_id, title, link, pile_id) => {
    const url = `${BASE_URL}/projects/${project_id}/add_idea`;
    const body = {
      link,
      pile_id,
      title
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
    console.log(options);
    const response = await fetch(`${url}`, options);
    const idea = await response.json();
    return idea;
  }

  const removeIdea = async (token, id) => {
    const url = `${BASE_URL}/idea/${id}`;
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    const options = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    const response = await fetch(`${url}`, options);
    const result = await response.json();
    return result;
  }

  const getMetaData = async (url) => {
    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'mode': 'no-cors'
    }
    const options = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    try {
      const response = await fetch(url, options);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // return result;
  }

  return (
    <ApiContext.Provider value={{
      addIdea,
      addPile,
      createProject,
      getAllColors,
      getAllProjects,
      getIdeaTypes,
      getMetaData,
      getProjectById,
      getProjectsByUserId,
      removeIdea,
      uploadFile,
      updatePile,
      updateProject
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