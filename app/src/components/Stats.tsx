import React from 'react'

import style from './Stats.module.scss'

interface StatsProps {
  docCount: number;
  aggDocSize: string;
}

const Stats: React.FC<StatsProps> = ({docCount, aggDocSize}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.docCount}>
        {docCount} documents
      </div>
      <div className={style.aggDocSize}>
        Total size: {aggDocSize}
      </div>
    </div>
  )
}

export default Stats
