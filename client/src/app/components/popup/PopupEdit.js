import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '../forms';
import { FiEdit } from 'react-icons/fi';


const PopupEdit = ({title, className, onSubmit, children}) => {
  const [ show, setShow ] = useState(false);

  const handleClose = () => setShow(false);;
  const handleShow = () => setShow(true);

  return(
    <>
    <FiEdit onClick={handleShow} className={className}/>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title} bewerken</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSubmit} placeholder='Opslaan' />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PopupEdit;