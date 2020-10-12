import React from 'react'

import style from './Dismiss.module.scss'


interface Handler {
  (): void;
}

interface DismissProps {
  clickHandler: Handler;
  extraClass?: string;
}



const Dismiss: React.FC<DismissProps> = ({
  clickHandler,
  extraClass
}) => {
  return (
    <div>
      <span
        onClick={clickHandler}
        className={`${style.dismiss} ${extraClass}`}
      >
      +
      </span>
    </div>
  )
}

export default Dismiss
