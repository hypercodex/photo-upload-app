import React, { useContext } from 'react'

import { StateContext } from '../containers/StateContainer'
import style from './Stats.module.scss'


const precisionRound = (value: number, precision: number): number => {
  const factor = Math.pow(10, precision || 0)
  return Math.round(value * factor) / factor
}
const toMegabytes = (bytes: number) => {
  return `${precisionRound(bytes/1000000, 1).toString()}Mb`
}

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
