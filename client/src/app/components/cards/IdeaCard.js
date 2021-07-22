import React, { useState } from 'react';
import Card from './Card';
import ReactPlayer from 'react-player';
import SpotifyPlayer from 'react-spotify-web-playback';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { CgRename } from 'react-icons/cg';
import { AiOutlineLink } from 'react-icons/ai';
import { GrCirclePlay } from 'react-icons/gr';
import { PopupDelete, PopupEdit } from '../popup';
import { useApi, useAuth } from '../../services';
import { TextInput } from '../forms';
import { 
  isValidURL,
  validateYouTubeUrl,
  validateSpotifyUrl
} from '../../utilities';

const IdeaCard = ({color, idea, fetchData, canEdit = false}) => {
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ isImage, setIsImage ] = useState(true);
  const [ title, setTitle ] = useState(idea.title);
  const [ link, setLink ] = useState(idea.link);
  const { removeIdea, updateIdea } = useApi();
  const { currentUser } = useAuth();

  const handleRemove = async (id) => {
    await removeIdea(currentUser.token, id);
    fetchData();
  }

  const handleUpdate = async (id) => {
    await updateIdea(currentUser.token, idea.id, title, link);
    fetchData();
  }

  function createMarkup() {
    return {__html: idea.link};
  }

  return(
    <Card extraClass={`pile--card`} onDragStart={(e) => {window.idea = idea; console.log(window)}} onDragEnd={() => console.log('Stopped')} style={{backgroundColor: color}} >
      <div className='w-100 d-flex flex-column align-items-start'>
        <div className='pile--card--header'>
          <p className="pile--card--header--title">{idea.title}</p>
          {
            canEdit &&
            <div>
              <PopupDelete title={`Idee verwijderen?`} onSubmit={() => handleRemove(idea.id)} />
              <PopupEdit title='Idee' onSubmit={handleUpdate} >
                <TextInput defaultValue={title} icon={<CgRename />} onChange={(ev) => setTitle(ev.target.value)} />
                {
                  !validateSpotifyUrl(idea.link) && !validateYouTubeUrl(idea.link) && !isImage && !isValidURL(idea.link) ?
                  <div className='w-100'>
                    <DefaultEditor value={link} onChange={(ev) => setLink(ev.target.value)} />
                  </div>
                  :
                  <TextInput defaultValue={link} icon={<AiOutlineLink />} onChange={(ev) => setLink(ev.target.value)} />
                }
              </PopupEdit>
            </div>
          }
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
            token={localStorage.getItem('spotifyToken')}
            uris={[idea.link]}
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
          isValidURL(idea.link) && !isImage && !validateSpotifyUrl(idea.link) && !validateYouTubeUrl(idea.link) && <a href={idea.link} target='_blank' rel='noreferrer'>{idea.link}</a>
        }
        {
          !validateSpotifyUrl(idea.link) && !validateYouTubeUrl(idea.link) && !isImage && !isValidURL(idea.link) &&
          <div dangerouslySetInnerHTML={createMarkup()} />
        }
        <p className='pile--card--author'>Toegevoegd door: <i>{idea.author.name}</i></p>
      </div>
    </Card>
  )
}

export default IdeaCard;