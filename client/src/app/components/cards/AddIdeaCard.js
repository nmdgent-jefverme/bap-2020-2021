import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useApi, useAuth } from '../../services';
import { Button, Errors, TextInput } from '../forms';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { PopupRecord } from '../popup';
import { IoMdSave } from 'react-icons/io';
import { BiTime } from 'react-icons/bi';
import { 
  validateYouTubeUrl,
} from '../../utilities';

const AddIdeaCard = ({color, project_id, pile_id, fetchData}) => {
  const [ newIdea, setNewIdea ] = useState('');
  const [ displayErrors, setDisplayErrors ] = useState(false);
  const [ errors, setErrors ] = useState();
  const [ showEditor, setShowEditor ] = useState(false);
  const [ isYoutube, setIsYoutube ] = useState(false);
  const [ startPoint, setStartPoint ] = useState('00:00:00');
  const { addIdea } = useApi();
  const { currentUser } = useAuth();

  const handleAdd = async () => {
    let totalSeconds;
    if(startPoint.length === 5) {
      const [hours, minutes] = startPoint.split(':');
      totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60;
    } else {
      const [hours, minutes, seconds] = startPoint.split(':');
      totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds);
    }
    const result = await addIdea(currentUser.token, project_id, 'Nieuw idee', newIdea, pile_id, currentUser.id, null, totalSeconds);
    if (result.success) {
      setIsYoutube(false);
      setStartPoint('00:00:00');
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

  useEffect(() => {
    if (validateYouTubeUrl(newIdea)) {
      setIsYoutube(true);
    }
  }, [newIdea])

  const textInputClicked = () => {
    window.setTimeout(() => {
      setShowEditor(true);
    }, 2000)
  }

  return(
    <Card extraClass={`d-flex flex-column pile--card addidea`} style={{backgroundColor: color}} /*onDragEnter={() => setDragging(true)} onDragExit={() => setDragging(false)}*/ >
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
        {
          isYoutube && showEditor && 
          <div className='w-100 d-flex flex-column align-items-start'>
            <p className='pb-2'>Startpunt video ('hh:mm:ss')</p>
            <TextInput type='time' defaultValue={startPoint} icon={<BiTime />} size='small' onChange={(ev) => setStartPoint(ev.target.value)} />
          </div>
        }
        <div className='d-flex'>
          <PopupRecord
            project_id={project_id}
            pileId={pile_id}
            fetchData={fetchData}
            color={color}
          />
          <Button placeholder={<IoMdSave />} size='medium' onClick={handleAdd} />
        </div>
      </div>
      {
        displayErrors && <Errors errors={errors} />
      }
    </Card>
  )
}

export default AddIdeaCard;