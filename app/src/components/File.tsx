import React from 'react'

import Button from './Button'

import style from './File.module.scss'

interface FileProps {
  name: string;
  size: string;
}


const File: React.FC<FileProps> = ({name, size}) => {
  return (
    <div className={style.panel}>
      <div>
        {name}
      </div>
      <div className={style.foot}>
        <div className={style.size}>
          {size}
        </div>
        <Button extraClass={style.button}>
          delete
        </Button>
      </div>
    </div>
  )
}

export default File
