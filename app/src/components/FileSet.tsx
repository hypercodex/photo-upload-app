import React, { useState } from 'react'


import style from './FileSet.module.scss'


const FileSet: React.FC = () => {

  const [files, setFiles] = useState(Array(7).fill())

  return (
    <>
      {files.map(( val, idx ) =>
        <div className={ style.panel } key={idx}>{ idx }</div>
      )}
    </>
  )
} 

export default FileSet
