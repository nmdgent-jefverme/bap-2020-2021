import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Card, Navigation, PageTitle, TextInput } from '../components';
import ReactAudioPlayer from 'react-audio-player';
import { BiMusic } from 'react-icons/bi';

const ProjectPage = () => {
  const { slug } = useParams();
  const [ projectIdeas ] = useState([
    {
      title: 'Opname zang',
      fileType: 'song',
      path: true
    },
    {
      title: 'Cover image',
      fileType: 'image',
    },
    {
      title: 'Tekst muziek',
      fileType: 'text',
      content: 'Lorem ipsum'
    },
    {
      title: 'Opname instrument',
      fileType: 'song',
      path: false
    },
  ]);

  const [ projectCards, setProjectCards ] = useState();

  useEffect(() => {
    const tempCards = [];
    projectIdeas.forEach((idea, key) => {
      if(idea.fileType === 'text') {
        tempCards.push(
          <Card extraClass='projectpage--card' key={key}>
            <h4 className='projectpage--card--title'>{idea.title}</h4>
            <div>
              <TextInput type='textarea' defaultValue={idea.content}/>
            </div>
          </Card>
        )
      } else if (idea.fileType === 'song') {
        tempCards.push(
          <Card extraClass='projectpage--card' key={key}>
            <h4 className='projectpage--card--title'>{idea.title}</h4>
            {
              !!idea.path ?
              <div className='projectpage--card--audio-container'>
                <BiMusic />
                <ReactAudioPlayer src={require('../assets/song.mp3').default} controls style={{height: '50px', width: '100%'}} controlsList='nodownload'/>
              </div>
              :
              <TextInput type='file'>Geen bestand</TextInput>
            }
          </Card>
        )
      } else if (idea.fileType === 'image') {
        tempCards.push(
          <Card extraClass='projectpage--card' key={key}>
            <h4 className='projectpage--card--title'>{idea.title}</h4>
            <div>
              <img src={require('../assets/image.png').default} alt={idea.title} className='projectpage--card--image'/>
            </div>
          </Card>
        )
      }
    });
    setProjectCards(tempCards);
  }, [projectIdeas])

  return(
    <>
      <Navigation activePage='projects'/>
      <PageTitle title={slug.replace('-', ' ')} />
      <div className='content'>
        <div className='projectpage'>
          {
            !!projectCards && projectCards.map((card) =>   
              card
            )
          }
        </div>
      </div>
    </>
  )
}

export default ProjectPage;