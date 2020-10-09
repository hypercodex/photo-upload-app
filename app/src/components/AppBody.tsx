import React from 'react'

import style from './AppBody.module.scss'


const AppBody: React.FC = ({ children }) => {
  return (
    <div className={ style.wrapper }>
      {children}
    </div>
  )
}

export default AppBody
