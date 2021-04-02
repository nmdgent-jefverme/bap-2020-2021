import React, { useCallback, useEffect, useState } from 'react';
import { useApi, useAuth } from '../../services';

const IdeaTypeDropdown = ({ onChange }) => {
  const [ ideaTypes, setIdeaTypes ] = useState();
  const { getIdeaTypes } = useApi();
  const { currentUser } = useAuth();

  const initFetch = useCallback(
    () => {
      const fetchItems = async () => {
        const tempIdeas = await getIdeaTypes(currentUser.token);
        setIdeaTypes(tempIdeas);
      }
      fetchItems();
    },
    [getIdeaTypes, currentUser],
  );
  
  useEffect(() => {
		initFetch();
  }, [initFetch]);

  return(
    <select className='dropdown' onChange={onChange}>
      <option value='0'>Kies een idee type</option>
      {
        !!ideaTypes && ideaTypes.map((type, key) => 
          <option key={key} value={type.id}>{type.type_name}</option>
        )
      }
    </select>
  )
}

export default IdeaTypeDropdown;