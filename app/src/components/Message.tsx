import React from 'react'

import Dismiss from './Dismiss'

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
      <Dismiss
        clickHandler={clickHandler}
        extraClass={style.dismiss}
      />
    </div>
  )
}

export default Message
