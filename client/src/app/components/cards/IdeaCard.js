import React, { useCallback, useEffect } from 'react';
import Card from './Card';
import ReactPlayer from 'react-player';
import SpotifyPlayer from 'react-spotify-player';
import { PopupDelete, PopupEdit } from '../popup';
import { useApi, useAuth } from '../../services';
import { TextInput } from '../forms';
import { 
  validateYouTubeUrl,
  validateSpotifyUrl
} from '../../utilities';

const IdeaCard = ({color, idea, fetchData}) => {
  const { getMetaData, removeIdea } = useApi();
  const { currentUser } = useAuth();
  const size = {
    width: '100%',
    height: 80,
  };

  const initFetch = useCallback(() => {
    const fetchData = async () => {
      await getMetaData(idea.link)
    }
    fetchData();
  }, [getMetaData, idea])

  useEffect(() => {
    initFetch();
  }, [initFetch])

  const handleRemove = async (id) => {
    await removeIdea(currentUser.token, id);
    fetchData();
  }
  return(
    <Card extraClass={`pile--card color_${color}`} /*onDragEnter={() => setDragging(true)} onDragExit={() => setDragging(false)}*/ >
      <div className='w-100 d-flex flex-column align-items-start'>
        <div className='pile--card--header'>
          <p>{idea.title}</p>
          <div>
            <PopupEdit title='Idee'>
              <TextInput defaultValue={idea.title}/>
            </PopupEdit>
            <PopupDelete title={`Idee verwijderen?`} onSubmit={() => handleRemove(idea.id)} />
          </div>
        </div>
        {
          validateYouTubeUrl(idea.link) && 
          <ReactPlayer
            url={idea.link}
            width='100%'
            height='180px'
          />
        }
        {
          validateSpotifyUrl(idea.link) && 
          <SpotifyPlayer
            uri={idea.link}
            size={size}
          />
        }
      </div>
    </Card>
  )
}

export default IdeaCard;