import React from 'react';
import { FiPlus } from 'react-icons/fi'
import { PopupEdit } from '../popup';
import Card from './Card';

const Pile = ({title, color = 1, ideas, editFunction, plusFunction}) => {
  return(
    <div className={`pile`}>
      <Card extraClass={`pile--card color_${color}`}>
        <h3>{title}</h3>
        <div className='pile--actions'>
          <FiPlus className='pile--icon' onClick={plusFunction}/>
          <PopupEdit className='pile--icon' title={title} onSubmit={editFunction} />
        </div>
      </Card>
      {
        ideas.map((idea, key) => 
          <Card key={key} extraClass={`pile--card color_${color}`}>
            <span>{idea.title}</span>
          </Card>
        )
      }
    </div>
  )
}

export default Pile;