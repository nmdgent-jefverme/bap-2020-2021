import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '../forms';
import { FiEdit } from 'react-icons/fi';

const PopupEdit = ({title, className, onSubmit, children, buttonDisabled}) => {
  const [ show, setShow ] = useState(false);

  const handleClose = () => setShow(false);;
  const handleShow = () => setShow(true);

  const submitFuncion = async () => {
    await onSubmit();
    handleClose();
  }

  return(
    <>
      <FiEdit onClick={handleShow} className={className}/>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title><h4>{`${title} bewerken`}</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitFuncion} placeholder='Opslaan' disabled={buttonDisabled} />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PopupEdit;