import React from 'react';

const Errors = ({ errors = [], message = '' }) => {
  return (
    <div className='errors'>
      <p>{message}</p>
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