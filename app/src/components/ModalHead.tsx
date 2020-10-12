import React from 'react'

import Dismiss from './Dismiss'

import style from './ModalHead.module.scss'

interface Handler {
  (): void;
}

interface ModalHeadProps {
  clickHandler: Handler;
}

const ModalHead: React.FC<ModalHeadProps> = ({ clickHandler }) => {
  return (
    <div className={style.wrapper}>
      <h3 className={style.htag}>
        File Uploader
      </h3>
      <Dismiss
        clickHandler={clickHandler}
        extraClass={style.dismiss}
      />
    </div>
  )
}

export default ModalHead
