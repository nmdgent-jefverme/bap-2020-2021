import { React } from 'react';

const Message = ({message, display, icon}) => {
  return (
    <div className={`message--container${display ? '' : '--remove'}`}>
      {message}
      {icon}
    </div>
  )
}

export default Message;