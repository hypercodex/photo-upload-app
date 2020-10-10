import React from 'react'

import DeleteFile from '../containers/DeleteFile' 

import style from './File.module.scss'

interface FileProps {
  id: string;
  name: string;
  size: string;
}


const File: React.FC<FileProps> = ({id, name, size}) => {
  return (
    <div className={style.panel}>
      <div className={style.name}>
        {name}
      </div>
      <div className={style.foot}>
        <div className={style.size}>
          {size}
        </div>
        <DeleteFile fileId={id} extraClass={style.button} />
      </div>
    </div>
  )
}

export default File
