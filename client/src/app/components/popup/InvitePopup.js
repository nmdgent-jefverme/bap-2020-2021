import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Errors, Message, TextInput } from '../forms';
import PopupDelete from './PopupDelete';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { useApi, useAuth } from '../../services';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import PopupEdit from './PopupEdit';

const PopupInvite = ({projectId}) => {
  const [ show, setShow ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ displayErrors, setDisplayErrors ] = useState(false);
  const [ errors, setErrors ] = useState([]);
  const [ role, setRole ] = useState(0);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ users, setUsers ] = useState();
  const [ displayMessageAnimation, setDisplayMessageAnimation ] = useState(false);
  const [ newRole, setNewRole ] = useState();

  const { inviteToProject, usersInProject, removeUserFromProject, updateUserRole } = useApi();
  const { currentUser } = useAuth();

  const initFetch = useCallback(
    () => {
      const fetchItems = async () => {
        const tempUsers = await usersInProject(currentUser.token, projectId);
        setUsers(tempUsers.data);
      }
      fetchItems();
    },
    [currentUser, usersInProject, projectId],
  );
  
  useEffect(() => {
		initFetch();
  }, [initFetch]);

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
        setDisplayMessage(true);
        setDisplayMessageAnimation(true);
        window.setTimeout(() => {
          setDisplayMessageAnimation(false);
        }, 2000)
        window.setTimeout(() => {
          setDisplayMessage(false);
        }, 4000)
        initFetch();
        handleClose();
      }
    }
  }

  const handleDelete = async (id) => {
    const result = await removeUserFromProject(currentUser.token, projectId, id);
    if (result.success) initFetch();
  }

  const handleUpdate = async (id) => {
    let error = false;
    const tempErrors = [];
    if (newRole === 0) {
      error = true;
      tempErrors.push('Gelieve een rol te selecteren');
    }
    if(error) {
      setErrors(tempErrors);
      setDisplayErrors(true);
      return false;
    } else {
      const result = await updateUserRole(currentUser.token, projectId, id, newRole);
      if(result.success) {
        setErrors([]);
        setDisplayErrors(false);
        initFetch();
        return true;
      } else {
        setErrors(['Er liep iets fout bij het updaten']);
        setDisplayErrors(true);
        return false;
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
          <div className='w-100 d-flex flex-column'>
            <p className='pb-2 underline'>Gebruikers in dit project:</p>
            {
              !!users && users.length > 0 && users.map((user, key) => {
                if(user.user_id !== currentUser.id) {
                  return(
                    <div key={key} className='p-2 d-flex justify-content-between border rounded border-dark mb-2'>
                      <p>{user.user.name}</p>
                      <div className='d-flex align-items-center'>
                        <PopupEdit
                          title={user.user.name}
                          onSubmit={() => handleUpdate(user.user_id)}
                        >
                          <select className='dropdown' onChange={(ev) => setNewRole(parseInt(ev.target.value))} defaultValue={user.role}>
                            <option value='0'>Kies een rol...</option>
                            <option value='1'>Bewerken</option>
                            <option value='2'>Bekijken</option>
                          </select>
                          {
                            displayErrors && <Errors errors={errors} />
                          }
                        </PopupEdit>
                        <PopupDelete
                          title={`${user.user.name} verwijderen uit project?`}
                          onSubmit={() => handleDelete(user.user_id)}
                        />
                      </div>
                    </div>
                  )
                }
              })
            }
          </div>
          {
            displayErrors && <Errors errors={errors} />
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitFuncion} placeholder='Uitnodigen' />
        </Modal.Footer>
      </Modal>
      <div>
        {
          displayMessage &&
          <Message
            message='Gebruiker uitgenodigd'
            display={displayMessageAnimation}
            icon={<span className='success'><AiOutlineCheckCircle /></span>}
          />
        }
      </div>
    </>
  )
}

export default PopupInvite;