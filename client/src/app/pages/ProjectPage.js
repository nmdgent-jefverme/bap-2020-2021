import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Button,
  ColorPicker,
  Navigation, 
  PageTitle,
  Pile,
  PopupAdd,
  TextInput,
} from '../components';
import { useApi, useAuth } from '../services';
import { CgRename } from 'react-icons/cg';
import Masonry from 'react-masonry-css';

const ProjectPage = () => {
  const { id } = useParams();
  const [ projectData, setProjectData ] = useState();
  const [ piles, setPiles ] = useState();
  const [ colors, setColors ] = useState();
  const [ title, setTitle ] = useState();
  const [ selectedColor, setSelectedColor ] = useState(1);
  const [ canEdit, setCanEdit ] = useState(false);
  const { addPile, canEditProject, getProjectById, getAllColors } = useApi();
  const { currentUser } = useAuth();

  const initFetch = useCallback(
    () => {
      const fetchItems = async () => {
        let temp = await getProjectById(currentUser.token, id);
        if(temp.data.author_id === currentUser.id) {
          setCanEdit(true);
        } else {
          const result = await canEditProject(currentUser.token, id, currentUser.id);
          console.log(result.data);
          setCanEdit(result.data === 1);
        }
        setPiles(temp.data.piles);
        setProjectData(temp.data);
        const tempColors = await getAllColors(currentUser.token);
        setColors(tempColors.data);
      }
      fetchItems();
    },
    [getProjectById, getAllColors, id, currentUser, canEditProject],
  );
  
  useEffect(() => {
		initFetch();
  }, [initFetch]);

  const handleAdd = async () => {
    await addPile(currentUser.token, id, selectedColor, title);
    let temp = await getProjectById(currentUser.token, id);
    setPiles(temp.data.piles);
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
        !!projectData && 
        <PageTitle 
          title={projectData.title} 
          info={true} 
          author={projectData.author.name} 
          date={new Date(projectData.updated_at).toLocaleDateString()}
          inviteBtn={canEdit}
          projectId={id}
        />
      }
      <div className='content'>
        <div className='projectpage' onDrop={() => console.log('Dropping')}>
          {
            canEdit && 
            <PopupAdd 
              title='Stapel toevoegen' 
              onSubmit={handleAdd} 
              addButton={<Button placeholder='+' size='add'/>} 
            >
              <TextInput onChange={(ev) => setTitle(ev.target.value)} icon={<CgRename />} placeholder='Titel stapel' />
              <span>Kies een kleur:</span>
              <ColorPicker setSelectedColor={setSelectedColor} colors={colors} activeColor={selectedColor} />
            </PopupAdd>
          }
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {
              !!piles && piles.length > 0 ? piles.map((pile, key) => 
                <Pile 
                  key={key} 
                  id={pile.id} 
                  color={pile.color_id} 
                  title={pile.name} 
                  ideas={pile.ideas} 
                  fetchData={initFetch} 
                  project_id={id}
                  canEdit={canEdit}
                />
              ) : <span>Geen ideeën voor dit project.</span>
            }
          </Masonry>
        </div>
      </div>
    </>
  )
}

export default ProjectPage;