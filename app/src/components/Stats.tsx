import React, { useContext } from 'react'

import { toMegabytes } from '../lib'
import { StateContext } from '../containers/StateContainer'
import style from './Stats.module.scss'


const Stats: React.FC = () => {
  const { state } = useContext(StateContext)
  const { fileCount, totalSize } = state
  return (
    <div className={style.wrapper}>
      <div className={style.count}>
        {fileCount === 1 ? '1 document' : `${fileCount} documents`}
      </div>
      <div className={style.aggSize}>
        Total size: {toMegabytes(totalSize)}
      </div>
    </div>
  )
}

export default Stats
