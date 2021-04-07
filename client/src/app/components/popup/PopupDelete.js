import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '../forms';
import { MdDelete } from 'react-icons/md';

const PopupDelete = ({title, className, onSubmit, children, addButton}) => {
  const [ show, setShow ] = useState(false);

  const handleClose = () => setShow(false);;
  const handleShow = () => setShow(true);

  const submitFuncion = async () => {
    await onSubmit();
    handleClose();
  }

  return(
    <>
      <MdDelete onClick={handleShow} className='popupdelete--icon' />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title><h4>Verwijderen</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {title}
        </Modal.Body>
        <Modal.Footer>
          <div className='w-100 d-flex justify-content-between align-items-center'>
            <Button size='medium__secondary' onClick={submitFuncion} placeholder='Ja' />
            <Button size='medium' onClick={handleClose} placeholder='Nee' />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PopupDelete;