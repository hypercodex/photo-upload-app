import React from 'react'

import Button from './Button'

import style from './UploadHead.module.scss'

interface Handler {
  (): void;
}

interface ModalHeadProps {
  clickHandler: Handler;
}

const UploadHead: React.FC<ModalHeadProps> = ({ clickHandler }) => {
  return (
    <div className={style.wrapper}>
      <p>
        File Uploader
      </p>
      <Button  clickHandler={clickHandler}>
        Cancel upload
      </Button>
    </div>
  )
}

export default UploadHead
