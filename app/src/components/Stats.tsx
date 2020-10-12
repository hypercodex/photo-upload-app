import React, { useContext } from 'react'

import { toMegabytes } from '../lib'
import { StateContext } from '../containers/StateContainer'
import style from './Stats.module.scss'


const Stats: React.FC = () => {
  const { state } = useContext(StateContext)
  return (
    <div className={style.wrapper}>
      <div className={style.count}>
        {state.fileCount} documents
      </div>
      <div className={style.aggSize}>
        Total size: {toMegabytes(state.totalSize)}
      </div>
    </div>
  )
}

export default Stats
