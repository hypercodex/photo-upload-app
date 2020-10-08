import React from 'react'

import style from './Stats.module.scss'

interface StatsProps {
  count: number;
  aggSize: string;
}

const Stats: React.FC<StatsProps> = ({count, aggSize}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.count}>
        {count} documents
      </div>
      <div className={style.aggSize}>
        Total size: {aggSize}
      </div>
    </div>
  )
}

export default Stats
