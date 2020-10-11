import React, { useContext } from 'react'

import type { File } from '../../../api/src/types'

import { GraphQLContext } from '../containers/App'
import { toKilobytes } from '../lib'
import Button from './Button'

import style from './File.module.scss'



const FileUpload: React.FC<{idx: number; file: File}> = React.memo(({idx, file}) => {
  const { handleDelete, refetch } = useContext(GraphQLContext)
  const clickHandler = () => {
    handleDelete(file.id)
    refetch()
  } 
  return (
    <>
        <div className={style.panel}>
        <img src={file.url} className={style.image} />
          <div className={style.overlay}>
            <div className={style.name}>
             Doc {++idx}
            {/* {file.name} */}
            </div>
            <div className={style.foot}>
              <div className={style.size}>
              {toKilobytes(file.size)}
              </div>
            <Button
              clickHandler={clickHandler}
              extraClass={style.button}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  )
})

FileUpload.displayName = 'FileUpload'

export default FileUpload
