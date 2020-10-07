import React, { useState } from 'react'


import style from './Files.module.scss'


const Files: React.FC = () => {

  const [files, setFiles] = useState(Array(7).fill())

  return (
    <>
      {files.map(( val, idx ) =>
        <div className={ style.panel } key={idx}>{ idx }</div>
      )}
    </>
  )
} 

export default Files
