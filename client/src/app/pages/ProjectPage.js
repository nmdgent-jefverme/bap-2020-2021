import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Button,
  ColorPicker,
  Errors,
  Navigation, 
  PageTitle,
  Pile,
  PopupAdd,
  TextInput,
} from '../components';
import { useApi, useAuth } from '../services';
import { CgRename } from 'react-icons/cg';
import Masonry from 'react-masonry-css';
import * as Routes from '../routes';
import { useHistory } from 'react-router-dom';

const ProjectPage = () => {
  const { id } = useParams();
  const [ projectData, setProjectData ] = useState();
  const [ piles, setPiles ] = useState();
  const [ colors, setColors ] = useState();
  const [ title, setTitle ] = useState();
  const [ selectedColor, setSelectedColor ] = useState(null);
  const [ canEdit, setCanEdit ] = useState(false);
  const [ errors, setErrors ] = useState();
  const [ displayError, setDisplayError ] = useState(false);
  const { addColor, addPile, canEditProject, getProjectById, getAllColors } = useApi();
  const { currentUser } = useAuth();
  const history = useHistory();

  const initFetch = useCallback(
    () => {
      const fetchItems = async () => {
        let temp = await getProjectById(currentUser.token, id);
        if(temp.data.author_id === currentUser.id) {
          setCanEdit(true);
        } else {
          const result = await canEditProject(currentUser.token, id, currentUser.id);
          if(!result.success) history.push(Routes.PROJECTS);
          setCanEdit(result.data === 1);
        }
        setPiles(temp.data.piles);
        setProjectData(temp.data);
        const tempColors = await getAllColors(currentUser.token, currentUser.id);
        setColors(tempColors);
      }
      fetchItems();
    },
    [getProjectById, getAllColors, id, currentUser, canEditProject],
  );
  
  useEffect(() => {
		initFetch();
  }, [initFetch]);

  const handleAdd = async () => {
    if (!selectedColor || title.trim() === '') {
      setDisplayError(true);
      setErrors(['Color and title are required.']);
      return 1;
    } else {
      setDisplayError(false);
      setSelectedColor(null);
      if(isNaN(selectedColor)) {
        const newColor = await addColor(currentUser.token, selectedColor, currentUser.id);
        const result = await addPile(currentUser.token, id, newColor.data.id, title);
        if (result.success) {
          let temp = await getProjectById(currentUser.token, id);
          setPiles(temp.data.piles);
          return true;
        } else return false;
      } else {
        const result = await addPile(currentUser.token, id, selectedColor, title);
        if (result.success) {
          let temp = await getProjectById(currentUser.token, id);
          setPiles(temp.data.piles);
          return true;
        } else return false;
      }
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
        !!projectData && 
        <PageTitle 
          title={projectData.title} 
          info={true} 
          author={projectData.author.name} 
          date={new Date(projectData.updated_at).toLocaleDateString()}
          inviteBtn={projectData.author_id === currentUser.id}
          projectId={id}
        />
      }
      <div className='content'>
        <div className='projectpage'>
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
              <div className='mt-4'>
                {
                  displayError && <Errors errors={errors} message='Er is een fout opgetreden:'/>
                }
              </div>
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
                  color={pile.color.color_value} 
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