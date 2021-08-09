import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Button,
  IdeaCard,
  Navigation, 
  PageTitle,
  PopupAdd,
  TextInput,
} from '../components';
import { useApi, useAuth } from '../services';
import { CgRename } from 'react-icons/cg';
import Masonry from 'react-masonry-css';
import * as Routes from '../routes';
import { useHistory } from 'react-router-dom';
import { DefaultEditor } from 'react-simple-wysiwyg';

const PileDetailPage = () => {
  const { id } = useParams();
  const [ pileData, setPileData ] = useState();
  const [ ideas, setIdeas ] = useState();
  const [ title, setTitle ] = useState();
  const [ newIdea, setNewIdea ] = useState('');
  const [ canEdit, setCanEdit ] = useState(false);
  const { addColor, addIdea, canEditProject, getPileById } = useApi();
  const { currentUser } = useAuth();
  const history = useHistory();

  const initFetch = useCallback(
    () => {
      const fetchItems = async () => {
        let temp = await getPileById(currentUser.token, id);
        const result = await canEditProject(currentUser.token, temp.data.pile.project_id, currentUser.id);
        if(!result.success) history.push(Routes.PROJECTS);
        setCanEdit(result.data === 1);
        setIdeas(temp.data.ideas);
        setPileData(temp.data.pile);
      }
      fetchItems();
    },
    [getPileById, id, currentUser, canEditProject],
  );
  
  useEffect(() => {
		initFetch();
  }, [initFetch]);

  const handleAdd = async () => {
    const result = await addIdea(currentUser.token, pileData.project_id, title, newIdea, id, currentUser.id);
    if (result.success) {
      initFetch();
      setNewIdea('');
      setTitle('');
    }
  }

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
    500: 1
  };

  return(
    <>
      <Navigation activePage='projects'/>
      { 
        !!pileData && 
        <PageTitle 
          title={pileData.name}
          closeBtn={true}
          projectId={pileData.project_id}
        />
      }
      <div className='content'>
        <div className='pilepage'>
          {
            canEdit && 
            <PopupAdd 
              title='Idee toevoegen' 
              onSubmit={handleAdd} 
              addButton={<Button placeholder='+' size='add'/>} 
            >
              <TextInput onChange={(ev) => setTitle(ev.target.value)} icon={<CgRename />} placeholder='Titel idee' />
              <div className='w-100'>
                <DefaultEditor value={newIdea} onChange={(ev) => setNewIdea(ev.target.value)} />
              </div>
            </PopupAdd>
          }
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
          {
              !!pileData && !!ideas && ideas.length > 0 ? ideas.map((idea, key) => 
                <IdeaCard 
                  key={key}
                  color={pileData.color.color_value}
                  idea={idea}
                  fetchData={initFetch}
                  canEdit={canEdit}
                />
              ) : <span>Geen ideeën voor deze stapel.</span>
            }
            </Masonry>
        </div>
      </div>
    </>
  )
}

export default PileDetailPage;