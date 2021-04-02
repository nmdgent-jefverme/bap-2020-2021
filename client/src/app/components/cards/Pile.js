import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { BsPlus } from 'react-icons/bs'
import Card from './Card';

const Pile = ({title, color = 1, ideas, editFunction, plusFunction}) => {
  return(
    <div className={`pile`}>
      <Card extraClass={`pile--card color_${color}`}>
        <h3>{title}</h3>
        <div className='pile--actions'>
          <BsPlus className='pile--icon' onClick={plusFunction}/>
          <FiEdit className='pile--icon' onClick={editFunction} />
        </div>
      </Card>
      <Card extraClass={`pile--card color_${color}`}><span>1</span></Card>
    </div>
  )
}

export default Pile;