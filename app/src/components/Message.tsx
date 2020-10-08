import React from 'react'

import style from './Message.module.scss'

interface Handler {
  (): void;
}


interface MessageProps {
  message?: string;
  clickHandler: Handler;
}

const Message: React.FC<MessageProps> = ({message, clickHandler}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.message}>
        {message ? message : ''}
      </div>
      <span
        onClick={clickHandler}
        className={style.dismiss}
      >
      +
      </span>
    </div>
  )
}

export default Message
