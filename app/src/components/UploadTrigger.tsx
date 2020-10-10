import React from 'react'

import Button from './Button'

import style from './UploadTrigger.module.scss'



interface Handler {
  (): void;
}



const uploadtrigger: React.FC<{clickHandler: Handler}> = ({clickHandler}) => {
  return (
    <Button
      clickHandler={clickHandler}
      extraClass={style.button}
    >
      upload
    </Button>
  )
}

export default uploadtrigger
