import React, { useContext } from 'react'

import { StateContext } from '../containers/StateContainer'
import style from './Stats.module.scss'

interface StatsProps {
  count: number;
  aggSize: string;
}

const Stats: React.FC<StatsProps> = ({count, aggSize}) => {
  const { state } = useContext(StateContext)
  return (
    <div className={style.wrapper}>
      <div className={style.count}>
        {state.fileCount} documents
      </div>
      <div className={style.aggSize}>
        Total size: {state.totalSize}Mb
      </div>
    </div>
  )
}

export default Stats
