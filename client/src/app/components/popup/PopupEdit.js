import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Errors, Message } from '../forms';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const PopupEdit = ({title, className, onSubmit, children, buttonDisabled}) => {
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
      setErrors(['Something went wrong updating']);
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
          {
            displayError && <Errors errors={errors} message='Er is een fout opgetreden'/>
          }
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