import React, { useCallback, useEffect, useState } from 'react';
import { ColorPicker, TextInput } from '../forms';
import { PopupEdit } from '../popup';
import Card from './Card';
import { CgRename } from 'react-icons/cg';
import { useApi, useAuth } from '../../services';
import { IdeaCard } from '.';
import AddIdeaCard from './AddIdeaCard';

const Pile = ({id, title, color = 1, ideas, piles, setPiles, project_id, fetchData}) => {
  const [ colors, setColors ] = useState();
  const [ selectedColor, setSelectedColor ] = useState(color);
  const [ newTitle, setNewTitle ] = useState(title);
  const [ dragging, setDragging ] = useState(false);
  const { getAllColors, updatePile } = useApi();
  const { currentUser } = useAuth();

  const initFetch = useCallback(() => {
    const fetchItems = async () => {
      const tempColors = await getAllColors(currentUser.token);
      setColors(tempColors.data);
    }
    fetchItems();
  }, [getAllColors, currentUser]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const handleUpdate = async () => {
    await updatePile(currentUser.token, id, newTitle, selectedColor);
    fetchData();
  }

  return(
    <div className={`pile${dragging ? '__dragging' : ''}`} >
      <Card extraClass={`pile--card color_${color}`} onDragEnter={() => setDragging(true)} onDragExit={() => setDragging(false)}>
        <h3>{title}</h3>
        <div className='pile--actions'>
          <PopupEdit className='pile--icon' title={title} onSubmit={handleUpdate} >
            <TextInput placeholder='Naam stapel' defaultValue={title} icon={<CgRename />} onChange={(ev) => setNewTitle(ev.target.value)} />
            <p>Kleur van de stapel:</p>
            {
              !!colors && <ColorPicker colors={colors} activeColor={selectedColor} setSelectedColor={setSelectedColor}/>
            }
          </PopupEdit>
        </div>
      </Card>
      {
        ideas.length > 0 ? 
          <>
            {
              ideas.map((idea, key) =>
                <IdeaCard 
                  key={key}
                  color={color}
                  idea={idea}
                  fetchData={fetchData}
                />
              )
            }
            <AddIdeaCard 
              color={color}
              project_id={project_id}
              pile_id={id}
              fetchData={fetchData}
            />
          </>
        :
          <>
            <Card extraClass={`pile--card__example color_${color}`}>
              <span>Nog geen ideeën</span>
            </Card>
            <AddIdeaCard 
              color={color}
              project_id={project_id}
              pile_id={id}
              fetchData={fetchData}
            />
          </>
      }
    </div>
  )
}

export default Pile;