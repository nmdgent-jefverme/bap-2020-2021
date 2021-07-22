import React, { useCallback, useEffect, useState } from 'react';
import { ColorPicker, TextInput } from '../forms';
import { PopupDelete, PopupEdit } from '../popup';
import Card from './Card';
import { CgRename } from 'react-icons/cg';
import { useApi, useAuth } from '../../services';
import { IdeaCard } from '.';
import AddIdeaCard from './AddIdeaCard';

const Pile = ({id, title, color, ideas, project_id, fetchData, canEdit = false}) => {
  const [ colors, setColors ] = useState();
  const [ selectedColor, setSelectedColor ] = useState(color);
  const [ newTitle, setNewTitle ] = useState(title);
  const [ dragging, setDragging ] = useState(false);
  const { getAllColors, updatePile, removePile } = useApi();
  const { currentUser } = useAuth();

  const initFetch = useCallback(() => {
    const fetchItems = async () => {
      const tempColors = await getAllColors(currentUser.token, currentUser.id);
      setColors(tempColors);
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

  const handleDelete = async () => {
    await removePile(currentUser.token, id);
    fetchData();
  }

  return(
    <div className={`pile${dragging ? '__dragging' : ''}`} >
      <Card extraClass={`pile--card`} onDragEnter={(e) => console.log(window)} onDragExit={() => setDragging(false)} style={{backgroundColor: color}}>
        <h3>{title}</h3>
        {
          canEdit &&
          <div className='pile--actions'>
            <PopupDelete 
              title='Stapel verwijderen?'
              onSubmit={handleDelete}
            />
            <PopupEdit className='pile--icon' title={title} onSubmit={handleUpdate} >
              <TextInput placeholder='Naam stapel' defaultValue={title} icon={<CgRename />} onChange={(ev) => setNewTitle(ev.target.value)} />
              <p>Kleur van de stapel:</p>
              {
                !!colors && <ColorPicker colors={colors} activeColor={selectedColor} setSelectedColor={setSelectedColor}/>
              }
            </PopupEdit>
          </div>
        }
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
                    canEdit={canEdit}
                  />
                )
              }
              {
              canEdit &&
                <AddIdeaCard 
                  color={color}
                  project_id={project_id}
                  pile_id={id}
                  fetchData={fetchData}
                />
              }
            </>
          :
            <>
              <Card extraClass={`pile--card__example`} style={{backgroundColor: color}}>
                <span>Nog geen ideeën</span>
              </Card>
              {
                canEdit &&
                <AddIdeaCard 
                  color={color}
                  project_id={project_id}
                  pile_id={id}
                  fetchData={fetchData}
                />
              }
            </>
        }
    </div>
  )
}

export default Pile;