import React, { useState } from 'react';
import { useApi, useAuth } from '../../services';

const FileUpload = ({ allowedFileTypes = '' }) => {
  const [ dragIn, setDragIn ] = useState(false);
  const [ extenstionArray ] = useState(allowedFileTypes.split(','));
  const [ error, setError ] = useState(false);
  const [ displayText, setDisplayText ] = useState('Sleep een bestand of klik hier!');
  const [ file, setFile ] = useState();
  const { uploadFile } = useApi();
  const { currentUser } = useAuth();

  const handleDrag = async (file) => {
    const extension = file[0].name.slice((file[0].name.lastIndexOf(".") - 1 >>> 0) + 2);
    if(!extenstionArray.includes(extension)) setError(true);
    else {
      setError(false);
      setDisplayText('Bestand aan het uploaden');
      const data = new FormData();
      data.append('file', file);
      await uploadFile(data, currentUser.token);
    }
  }
  return(
    <label for="test" className={`fileupload--container${error? '__error' : ''}`} onDragEnter={() => setDragIn(true)} onDragLeave={() => setDragIn(false)} onChange={(ev) => {handleDrag(ev.target.files); setDragIn(false)}}>
      {
        dragIn ? 
        <div className='fileupload--label__draggin'>Droppen</div> :
        <div className={`fileupload--label${error? '__error' : ''}`}><p>{error? 'Fout bestandstype, toegestane bestanden: ' + allowedFileTypes + '!' : displayText}</p></div>
      }
      <input type='file' className='fileupload'/>
    </label>
  )
}

export default FileUpload;