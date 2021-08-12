import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '../forms';
import { RiRecordCircleLine } from 'react-icons/ri';
import { ReactMic } from 'react-mic';
import { useApi, useAuth } from '../../services';

const PopupRecord = ({project_id, pileId, color, fetchData}) => {
  const [ show, setShow ] = useState(false);
  const [ recording, setRecording ] = useState(false);
  const [ fileObject, setFile ] = useState(null);
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
    const file = new File([fileObject.blob], "newSong", {lastModified: new Date().toISOString(), type: fileObject.blob.type});
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
            <>
            {
              fileObject === null ?
                <ReactMic 
                  record={recording}
                  className="w-100 border border-black rounded"
                  onStop={(ev) => {
                    setRecordBtn(false);
                    setFile(ev)
                  }}
                  visualSetting='frequencyBars'
                  strokeColor={color}
                />
                :
                <video controls name='media' controlsList="nodownload" style={{height: '3rem', width: '100%'}}>
                  <source src={fileObject.blobURL} type="video/webm" />
                </video>
            }
            </>
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
                <div className='w-100 d-flex justify-content-between'>
                  <Button placeholder='Opnieuw' size='medium' onClick={() => {
                    setRecordBtn(true);
                    setFile(null);
                  }} />
                  <Button placeholder='Opslaan' size='medium' onClick={handleUpload} />
                </div>
              }
            </>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PopupRecord;