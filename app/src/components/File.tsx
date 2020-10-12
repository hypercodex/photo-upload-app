import React, { useContext } from 'react'

import type { File as ApiFile } from '../../../api/src/types'

import { GraphQLContext } from '../containers/App'
import { toKilobytes } from '../lib'
import Button from './Button'

import style from './File.module.scss'



const Outset: React.FC<{orient: string}> = ({orient, children}) => 
  <div className={style.outsetWrap}>
    <div className={
      orient === 'top' ? style.topOutset : style.bottomOutset
      } >
      {children}
    <div></div>
    </div>
  </div>

const FileUpload: React.FC<{idx: number; file: ApiFile}> = React.memo(({idx, file}) => {
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
              <Outset orient={'top'}>
                Doc {++idx}
              </Outset>
              <div className={style.underlay}></div>
              <div className={style.foot}>
              <Outset orient={'bottom'} > 
                {toKilobytes(file.size)}
              </Outset>
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
