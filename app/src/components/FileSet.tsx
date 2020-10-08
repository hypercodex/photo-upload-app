import React, { useState } from 'react'

import File from './File'


const FileSet: React.FC = () => {

  const [files, setFiles] = useState(Array(7).fill())

  return (
    <>
      {files.map(( val, idx ) =>
        <File key={idx} name={`Doc ${idx}`} size={`${idx}00kb`} />
      )}
    </>
  )
} 

export default FileSet
