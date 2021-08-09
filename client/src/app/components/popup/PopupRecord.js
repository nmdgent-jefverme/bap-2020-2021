import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '../forms';
import { RiRecordCircleLine } from 'react-icons/ri';
import { ReactMic } from 'react-mic';
import { useApi, useAuth } from '../../services';

const PopupRecord = ({project_id, pileId, color, fetchData}) => {
  const [ show, setShow ] = useState(false);
  const [ recording, setRecording ] = useState(false);
  const [ fileObject, setFile ] = useState();
  const [ recordBtn, setRecordBtn ] = useState(true);
  const [ canRecord, setCanRecord ] = useState(false);
  const { uploadFile, addIdea } = useApi();
  const { currentUser } = useAuth();
  window.alert = function() {};
  const handleClose = () => {
    setShow(false);
    setRecordBtn(true);
    setFile(null);
  };
  const handleShow = () => setShow(true);

  navigator.getUserMedia({audio:true}, 
    function(stream) {
        setCanRecord(true);
    },
    function(e) {
      setCanRecord(false);
    }
  );

  const handleUpload = async (blob) => {
    const data = new FormData();
    const file = new File([fileObject], "newSong", {lastModified: new Date().toISOString(), type: fileObject.type});
    data.append('file', file);
    const fileId = await uploadFile(data, currentUser.token);
    const result = await addIdea(currentUser.token, project_id, `Opname ${new Date().toLocaleDateString()}`, false, pileId, currentUser.id, fileId);
    if (result.success) {
      fetchData();
      setRecordBtn(true);
      setFile(null);
      handleClose();
    }
  }

  return(
    <>
      <div onClick={handleShow} className='popuprecord--button'> 
        <RiRecordCircleLine />
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title><h4>Audio opname</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            canRecord ?
            <ReactMic 
              record={recording}
              className="w-100 border border-black rounded"
              onStop={(ev) => {
                setRecordBtn(false);
                setFile(ev.blob)
              }}
              visualSetting='frequencyBars'
              strokeColor={color}
            />
            :
            <p>Geef toestemming voor het opnemen van geluid.</p>
          }
        </Modal.Body>
        <Modal.Footer>
          {
            canRecord && 
            <>
              {
                recordBtn ?
                <Button placeholder={recording ? 'Stoppen' : 'Opnemen'} size='medium' onClick={() => setRecording(!recording)} />
                :
                <Button placeholder='Opslaan' size='medium' onClick={handleUpload} />
              }
            </>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PopupRecord;