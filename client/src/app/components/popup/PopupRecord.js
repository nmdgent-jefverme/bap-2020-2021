import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '../forms';
import { RiRecordCircleLine } from 'react-icons/ri';
import { ReactMic } from 'react-mic';
import { useApi, useAuth } from '../../services';

const PopupRecord = ({className, onSubmit, color}) => {
  const [ show, setShow ] = useState(false);
  const [ recording, setRecording ] = useState(false);
  const { uploadFile } = useApi();
  const { currentUser } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpload = async (blob) => {
    const data = new FormData();
    data.append('file', blob.blobURL);
    await uploadFile(data, currentUser.token);
  }

  return(
    <>
      <div onClick={handleShow}> 
        <RiRecordCircleLine />
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title><h4>Audio opname</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactMic 
            record={recording}
            className="w-100"
            onStop={(ev) => handleUpload(ev)}
            strokeColor="#000000"
            backgroundColor={color}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button placeholder='Opnemen' size='medium' onClick={() => setRecording(!recording)} />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PopupRecord;