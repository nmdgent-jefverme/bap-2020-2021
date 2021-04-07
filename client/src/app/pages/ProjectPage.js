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
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

const ProjectPage = () => {
  const { id } = useParams();
  const [ projectData, setProjectData ] = useState();
  const [ piles, setPiles ] = useState();
  const [ colors, setColors ] = useState();
  const [ title, setTitle ] = useState();
  const [ selectedColor, setSelectedColor ] = useState(1);
  const { addPile, getProjectById, getAllColors } = useApi();
  const { currentUser } = useAuth();

  const initFetch = useCallback(
    () => {
      const fetchItems = async () => {
        console.log('fetching data');
        let temp = await getProjectById(currentUser.token, id);
        console.log(temp.data.piles);
        setPiles(temp.data.piles);
        setProjectData(temp.data);
        const tempColors = await getAllColors(currentUser.token);
        setColors(tempColors.data);
      }
      fetchItems();
    },
    [getProjectById, getAllColors, id, currentUser],
  );
  
  useEffect(() => {
		initFetch();
  }, [initFetch]);

  const handleAdd = async () => {
    await addPile(currentUser.token, id, selectedColor, title);
    let temp = await getProjectById(currentUser.token, id);
    setPiles(temp.data.piles);
  }

  return(
    <>
      <Navigation activePage='projects'/>
      { !!projectData && <PageTitle title={projectData.title} />}
      <div className='content'>
        <div className='projectpage' onDragEnter={() => console.log('dragging')} onDragEnd={(ev) => console.log(ev)}>
          <PopupAdd title='Stapel toevoegen' onSubmit={handleAdd} addButton={<Button placeholder='+' size='add'/>} >
            <TextInput onChange={(ev) => setTitle(ev.target.value)} icon={<CgRename />} placeholder='Titel stapel' />
            <span>Kies een kleur:</span>
            <ColorPicker setSelectedColor={setSelectedColor} colors={colors} activeColor={selectedColor} />
          </PopupAdd>
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}} >
            <Masonry>
              {
                !!piles && piles.map((pile, key) => 
                  <Pile key={key} id={pile.id} color={pile.color_id} title={pile.name} ideas={pile.ideas} fetchData={initFetch} project_id={id} />
                )
              }
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </>
  )
}

export default ProjectPage;