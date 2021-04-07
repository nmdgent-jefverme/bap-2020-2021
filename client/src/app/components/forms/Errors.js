import React from 'react';

const Errors = ({ errors = [], message = false }) => {
  return (
    <div className='errors'>
      {
        message && <p>{message}</p>
      }
      <ul>
        {
          errors.map((error, key) => 
            <li key={key}>{error}</li>
          )
        }
      </ul>
    </div>
  )
}

export default Errors;