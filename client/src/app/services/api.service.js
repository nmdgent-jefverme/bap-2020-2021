import { default as React, useContext, createContext, } from 'react';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  // const BASE_URL = 'http://api.jefverme-cms.be/api';
  const BASE_URL = '';

  /**
   * Project functions
  */
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

  const inviteToProject = async (token, id, email, role) => {
    const url = `${BASE_URL}/projects/${id}/invite`;
    const body = {
      email,
      role
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
    console.log(project);
    return project;
  }

  const canEditProject  = async (token, projectId, userId) => {
    const url = `${BASE_URL}/projects/${projectId}/can_edit?user_id=${userId}`;
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
    const result = await response.json();
    console.log(result);
    return result;
  }

  /**
   * Pile functions
  */
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

  const removePile = async (token, id) => {
    const url = `${BASE_URL}/pile/${id}`;
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

  /**
   * Idea functions
  */
  const addIdea = async (token, project_id, title, link, pile_id, author_id) => {
    const url = `${BASE_URL}/projects/${project_id}/add_idea`;
    const body = {
      link,
      pile_id,
      title,
      author_id
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
    const idea = await response.json();
    return idea;
  }

  const updateIdea = async (token, id, title, link) => {
    const url = `${BASE_URL}/idea/${id}`;
    const body = {
      link,
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

  /**
   * Random functions
  */
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
    const response = await fetch(url, options);
    const upLoadedFile = await response.json();
    return upLoadedFile;
    /* const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
      file: file
    };
    const result = await axios.post(`${BASE_URL}/file_upload`, bodyParameters, config);*/
  }
  
  const getAllColors = async (token, id) => {
    const url = `${BASE_URL}/colors?user_id=${id}`;

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
    if(projects.data.length >= 5) {
      const result = projects.data.slice(-5);
      return result;
    } else {
      return projects.data;
    }
  }

  const addColor = async (token, color_value, author_id) => {
    const url = `${BASE_URL}/colors`;
    const body = {
      color_value,
      author_id
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
    const color = await response.json();
    return color;
  }

  return (
    <ApiContext.Provider value={{
      addColor,
      addIdea,
      addPile,
      canEditProject,
      createProject,
      getAllColors,
      getAllProjects,
      getIdeaTypes,
      getProjectById,
      getProjectsByUserId,
      inviteToProject,
      removeIdea,
      removePile,
      uploadFile,
      updateIdea,
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