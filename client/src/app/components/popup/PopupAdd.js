import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '../forms';

const PopupAdd = ({title, className, onSubmit, children, addButton}) => {
  const [ show, setShow ] = useState(false);

  const handleClose = () => setShow(false);;
  const handleShow = () => setShow(true);

  const submitFuncion = async () => {
    await onSubmit();
    handleClose();
  }

  return(
    <>
      <div onClick={handleShow}> 
      {addButton}
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title><h4>{title}</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitFuncion} placeholder='Opslaan' />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PopupAdd;