import React, { useContext } from 'react'

import { GraphQLContext } from '../containers/App'

import Button from './Button'

import style from './File.module.scss'


interface FileProps {
  id: string;
  name: string;
  size: string;
}

const File: React.FC<FileProps> = ({id, name, size}) => {
  const { handleDelete, refetch } = useContext(GraphQLContext)
  const clickHandler = () => {
    handleDelete(id)
    refetch()
  } 
  return (
    <div className={style.panel}>
      <div className={style.name}>
        {name}
      </div>
      <div className={style.foot}>
        <div className={style.size}>
          {size}
        </div>
        <Button
          clickHandler={clickHandler}
          extraClass={style.button}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default File
