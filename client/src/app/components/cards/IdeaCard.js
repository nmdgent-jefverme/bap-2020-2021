import React, { useState } from 'react';
import Card from './Card';
import ReactPlayer from 'react-player';
import SpotifyPlayer from 'react-spotify-player';
import { CgRename } from 'react-icons/cg';
import { AiOutlineLink } from 'react-icons/ai';
import { GrCirclePlay } from 'react-icons/gr';
import { PopupDelete, PopupEdit } from '../popup';
import { useApi, useAuth } from '../../services';
import { TextInput } from '../forms';
import { 
  validateYouTubeUrl,
  validateSpotifyUrl
} from '../../utilities';

const IdeaCard = ({color, idea, fetchData, playAll}) => {
  const [ isPlaying, setIsPlaying ] = useState(playAll);
  const [ isImage, setIsImage ] = useState(true);
  const [ title, setTitle ] = useState(idea.title);
  const [ link, setLink ] = useState(idea.link);
  const { removeIdea, updateIdea } = useApi();
  const { currentUser } = useAuth();
  const size = {
    width: '100%',
    height: 80,
  };

  const handleRemove = async (id) => {
    await removeIdea(currentUser.token, id);
    fetchData();
  }

  const handleUpdate = async (id) => {
    await updateIdea(currentUser.token, idea.id, title, link);
    fetchData();
  }

  return(
    <Card extraClass={`pile--card color_${color}`} /*onDragEnter={() => setDragging(true)} onDragExit={() => setDragging(false)}*/ >
      <div className='w-100 d-flex flex-column align-items-start'>
        <div className='pile--card--header'>
          <p>{idea.title}</p>
          <div>
            <PopupEdit title='Idee' onSubmit={handleUpdate} >
              <TextInput defaultValue={title} icon={<CgRename />} onChange={(ev) => setTitle(ev.target.value)} />
              <TextInput defaultValue={link} icon={<AiOutlineLink />} onChange={(ev) => setLink(ev.target.value)} />
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
            playing={isPlaying}
            light={true}
            playIcon={<GrCirclePlay className='pile--card--play' onClick={() => setIsPlaying(true)}/>}
            controls={true}
          />
        }
        {
          validateSpotifyUrl(idea.link) && 
          <SpotifyPlayer
            uri={idea.link}
            size={size}
          />
        }
        {
          !validateSpotifyUrl(idea.link) && !validateYouTubeUrl(idea.link) && isImage &&
          <img
            src={idea.link}
            alt={`${idea.title}`}
            onError={(ev) => setIsImage(false)}
          />
        }
        {
          !isImage && <a href={idea.link} target='_blank' rel='noreferrer'>{idea.link}</a>
        }
      </div>
    </Card>
  )
}

export default IdeaCard;