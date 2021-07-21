import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Errors, TextInput } from '../forms';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { useApi, useAuth } from '../../services';


const PopupInvite = ({projectId, onChange}) => {
  const [ show, setShow ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ displayErrors, setDisplayErrors ] = useState(false);
  const [ errors, setErrors ] = useState([]);
  const [ role, setRole ] = useState(0);

  const { inviteToProject } = useApi();
  const { currentUser } = useAuth();

  const handleClose = () => setShow(false);;
  const handleShow = () => setShow(true);

  const submitFuncion = async () => {
    let error = false;
    const tempErrors = [];
    if (role === 0) {
      error = true;
      tempErrors.push('Gelieve een rol te selecteren');
    }
    if (email.trim() === '') {
      error = true;
      tempErrors.push('Gelieve een email in te vullen')
    }

    if(error) {
      setErrors(tempErrors);
      setDisplayErrors(true);
    } else {
      const result = await inviteToProject(currentUser.token, projectId, email, role);
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
          <select className='dropdown' onChange={(ev) => setRole(parseInt(ev.target.value))}>
            <option value='0'>Kies een rol...</option>
            <option value='1'>Bewerken</option>
            <option value='2'>Bekijken</option>
          </select>
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