import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Errors, TextInput } from '../forms';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { useApi, useAuth } from '../../services';


const PopupInvite = ({projectId}) => {
  const [ show, setShow ] = useState(false);
  const [ email, setEmail ] = useState();
  const [ displayErrors, setDisplayErrors ] = useState(false);
  const [ errors, setErrors ] = useState();

  const { inviteToProject } = useApi();
  const { currentUser } = useAuth();

  const handleClose = () => setShow(false);;
  const handleShow = () => setShow(true);

  const submitFuncion = async () => {
    const result = await inviteToProject(currentUser.token, projectId, email);
    if (!result.success && result.message === 'user not found') {
      setDisplayErrors(true);
      setErrors(['Gebruiker niet gevonden']);
    } else if(!result.success && result.message === 'user already in project') {
      setDisplayErrors(true);
      setErrors(['Gebruiker reeds toegevoegd']);
    } else {
      handleClose();
    }
  }

  return(
    <>
      <div onClick={handleShow}> 
        <BsFillPersonPlusFill />
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title><h4>Uitnodigen</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput type='email' placeholder='Vul het email adres in' defaultValue={email} onChange={(ev) => setEmail(ev.target.value)} />
          {
            displayErrors && <Errors errors={errors} />
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitFuncion} placeholder='Uitnodigen' />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PopupInvite;