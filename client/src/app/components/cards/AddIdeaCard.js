import React, { useState } from 'react';
import Card from './Card';
import { useApi, useAuth } from '../../services';
import { Button, Errors, TextInput } from '../forms';

const AddIdeaCard = ({color, project_id, pile_id, fetchData}) => {
  const [ newIdea, setNewIdea ] = useState();
  const [ displayErrors, setDisplayErrors ] = useState(false);
  const [ errors, setErrors ] = useState();
  const { addIdea } = useApi();
  const { currentUser } = useAuth();

  const handleAdd = async () => {
    const result = await addIdea(currentUser.token, project_id, 'Nieuw idee', newIdea, pile_id);
    if (result.success) {
      setNewIdea('');
      setDisplayErrors(false);
      setErrors([]);
      fetchData();
    } else {
      setDisplayErrors(true);
      setErrors(['Title field is required']);
      window.setTimeout(() => {
        setDisplayErrors(false);
      }, 1500);
    }
  }

  return(
    <Card extraClass={`d-flex flex-column pile--card color_${color}`} /*onDragEnter={() => setDragging(true)} onDragExit={() => setDragging(false)}*/ >
      <div className='d-flex align-items-center w-100'>
        <TextInput placeholder='Nieuw idee' size='medium' onChange={(ev) => setNewIdea(ev.target.value)} defaultValue={newIdea} />
        <Button placeholder='Opslaan' size='medium' onClick={handleAdd} />
      </div>
      {
        displayErrors && <Errors errors={errors} />
      }
    </Card>
  )
}

export default AddIdeaCard;