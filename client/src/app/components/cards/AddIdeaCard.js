import React, { useState } from 'react';
import Card from './Card';
import { useApi, useAuth } from '../../services';
import { Button, Errors, TextInput } from '../forms';
import { DefaultEditor } from 'react-simple-wysiwyg';

const AddIdeaCard = ({color, project_id, pile_id, fetchData}) => {
  const [ newIdea, setNewIdea ] = useState('');
  const [ displayErrors, setDisplayErrors ] = useState(false);
  const [ errors, setErrors ] = useState();
  const [ showEditor, setShowEditor ] = useState(false);
  const { addIdea } = useApi();
  const { currentUser } = useAuth();

  const handleAdd = async () => {
    const result = await addIdea(currentUser.token, project_id, 'Nieuw idee', newIdea, pile_id, currentUser.id);
    if (result.success) {
      setNewIdea('');
      setDisplayErrors(false);
      setErrors([]);
      setShowEditor(false);
      fetchData();
    } else {
      setDisplayErrors(true);
      setErrors(['Title field is required']);
      window.setTimeout(() => {
        setDisplayErrors(false);
      }, 1500);
    }
  }

  const textInputClicked = () => {
    window.setTimeout(() => {
      setShowEditor(true);
    }, 1000)
  }

  return(
    <Card extraClass={`d-flex flex-column pile--card color_${color}`} /*onDragEnter={() => setDragging(true)} onDragExit={() => setDragging(false)}*/ >
      <div className={`d-flex ${showEditor ? 'pile--card--column' : 'align-items-center' } w-100`}>
        {
          !showEditor &&
          <TextInput placeholder='Nieuw idee' size='medium' onChange={(ev) => setNewIdea(ev.target.value)} onClick={textInputClicked} defaultValue={newIdea} />
        }
        {
          showEditor &&
          <div style={{width: '100%', backgroundColor: 'white', borderRadius: '5px', marginBottom: '15px'}}>
            <DefaultEditor value={newIdea} onChange={(ev) => setNewIdea(ev.target.value)} />
          </div>
        }
        <Button placeholder='Opslaan' size='medium' onClick={handleAdd} />
      </div>
      {
        displayErrors && <Errors errors={errors} />
      }
    </Card>
  )
}

export default AddIdeaCard;