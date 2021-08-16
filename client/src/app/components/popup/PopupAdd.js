import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Button, Errors, Message } from '../forms';

const PopupAdd = ({title, className, onSubmit, children, addButton}) => {
  const [ show, setShow ] = useState(false);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ displayMessageAnimation, setDisplayMessageAnimation ] = useState(false);
  const [ errors, setErrors ] = useState([]);
  const [ displayError, setDisplayError ] = useState(false);

  const handleClose = () => setShow(false);;
  const handleShow = () => setShow(true);

  const submitFuncion = async () => {
    const result = await onSubmit();
    if(result && result !== 1) {
      setDisplayError(false);
      setDisplayMessage(true);
      setDisplayMessageAnimation(true);
      window.setTimeout(() => {
        setDisplayMessageAnimation(false);
      }, 2000)
      window.setTimeout(() => {
        setDisplayMessage(false);
      }, 4000)
      handleClose();
    } else if (!result) {
      setDisplayError(true);
      setErrors(['Something went wrong adding']);
    }
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
          {
            displayError && <Errors errors={errors} message='Er is een fout opgetreden'/>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitFuncion} placeholder='Opslaan' />
        </Modal.Footer>
      </Modal>
      <div>
        {
          displayMessage && 
          <Message 
            message='Stapel toegevoegd'
            display={displayMessageAnimation}
            icon={<span className='success'><AiOutlineCheckCircle /></span>}
          />
        }
      </div>
    </>
  )
}

export default PopupAdd;