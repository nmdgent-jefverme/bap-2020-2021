import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Message } from '../forms';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const PopupEdit = ({title, className, onSubmit, children, buttonDisabled}) => {
  const [ show, setShow ] = useState(false);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ displayMessageAnimation, setDisplayMessageAnimation ] = useState(false);

  const handleClose = () => setShow(false);;
  const handleShow = () => setShow(true);

  const submitFuncion = async () => {
    const result = await onSubmit();
    if(result) {
      setDisplayMessage(true);
      setDisplayMessageAnimation(true);
      window.setTimeout(() => {
        setDisplayMessageAnimation(false);
      }, 2000)
      window.setTimeout(() => {
        setDisplayMessage(false);
      }, 4000)
      handleClose();
    }
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
      <div>
        {
          displayMessage && 
          <Message 
            message={`${title} bijgewerkt`}
            display={displayMessageAnimation}
            icon={<span className='success'><AiOutlineCheckCircle /></span>}
          />
        }
      </div>
    </>
  )
}

export default PopupEdit;