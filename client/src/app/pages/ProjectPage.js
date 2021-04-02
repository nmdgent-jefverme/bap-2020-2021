import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { 
  Button, 
  Card, 
  FileUpload, 
  IdeaTypeDropdown, 
  Navigation, 
  PageTitle,
  Pile,
  TextInput 
} from '../components';
import ReactAudioPlayer from 'react-audio-player';
import { BiMusic } from 'react-icons/bi';
import { useApi, useAuth } from '../services';
import { Modal } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ProjectPage = () => {
  const { id } = useParams();
  const [ projectData, setProjectData ] = useState();
  const [ projectCards, setProjectCards ] = useState();
  const [ selectedType, setSelectedType ] = useState(0);
  const [ ideaTypes, setIdeaTypes ] = useState();
  const [ piles, setPiles ] = useState();
  const { getProjectById, getIdeaTypes } = useApi();
  const [ show, setShow ] = useState(false);

  const handleClose = () => { setShow(false); setSelectedType(0) };
  const handleShow = () => setShow(true);
  //eslint-disable-next-line
  const { currentUser } = useAuth();

  const initFetch = useCallback(
    () => {
      const fetchItems = async () => {
        let temp = await getProjectById(currentUser.token, id);
        setPiles(temp.data.piles);
        console.log(temp.data.piles);
        setProjectData(temp.data);
        const tempCards = [];
        /* temp.data.project_ideas.forEach((idea, key) => {
          if(idea.idea_type.type_name === 'text') {
            tempCards.push(
              <Card extraClass='projectpage--card' key={key}>
                <h4 className='projectpage--card--title'>{idea.title}</h4>
                <div>
                  <TextInput type='textarea' defaultValue={idea.content}/>
                </div>
              </Card>
            )
          } else if (idea.idea_type.type_name === 'song') {
            tempCards.push(
              <Card extraClass='projectpage--card' key={key}>
                <h4 className='projectpage--card--title'>{idea.title}</h4>
                {
                  !!false ?
                  <div className='projectpage--card--audio-container'>
                    <BiMusic />
                    <ReactAudioPlayer src={require('../assets/song.mp3').default} controls style={{height: '50px', width: '100%'}} controlsList='nodownload'/>
                  </div>
                  :
                  <FileUpload type='file'>Geen bestand</FileUpload>
                }
              </Card>
            )
          } else if (idea.idea_type.type_name === 'image') {
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
        const tempIdeas = await getIdeaTypes(currentUser.token);
        setIdeaTypes(tempIdeas); */
      }
      fetchItems();
    },
    [getProjectById, id, getIdeaTypes, currentUser],
  );
  
  useEffect(() => {
		initFetch();
  }, [initFetch]);

  return(
    <>
      <Navigation activePage='projects'/>
      { !!projectData && <PageTitle title={projectData.title} buttonAction={handleShow} />}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Idee toevoegen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput placeholder='Titel idee'/>
          <IdeaTypeDropdown onChange={(ev) => setSelectedType(parseInt(ev.target.value))} />
          {
            !!ideaTypes && selectedType === 1 ? 
            <FileUpload allowedFileTypes={ideaTypes[0].allowed_file_types.replace(/ /g, '')}/> : null
          }
          {
            !!ideaTypes && selectedType === 2 ?
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
            /> : null
          }
          {
            !!ideaTypes && selectedType === 3 ? 
            <FileUpload allowedFileTypes={ideaTypes[2].allowed_file_types.replace(/ /g, '')}/> : null
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} placeholder='Toevoegen' />
          <Button size='large__secondary' onClick={handleClose} placeholder='Annuleren' />
        </Modal.Footer>
      </Modal>
      <div className='content'>
        <div className='projectpage'>
          {/* {
            !!projectCards && projectCards.length > 0 ? projectCards.map((card) =>   
              card
            ) : 
            <Card extraClass='projectpage--card'>
                <h4 className='projectpage--card--title'>Geen ideeën</h4>
                <div>
                  <span>Voeg een toe via de plusknop!</span>
                </div>
              </Card>
          } */}
          {
            !!piles && piles.map((pile, key) => 
              <Pile key={key} color={pile.color.id} title={pile.name} />
            )
          }
        </div>
      </div>
    </>
  )
}

export default ProjectPage;