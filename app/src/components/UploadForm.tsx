import React, { useState } from 'react'

import FileDrop from './FileDrop'
import Message from './Message'

import style from './UploadForm.module.scss'




const UploadForm: React.FC = () => {
  const [files, setFiles] = useState<[] | Blob[]>([])
  const [message, setMessage] = useState<undefined | string>('Hello')

  const spreadFiles = (file: Blob) => {
    console.log(files)
    setFiles(prevFiles => ([...prevFiles, file]))
  } 

  const fileList = files.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      {message ?
        <Message
          clickHandler={() => setMessage(undefined)}
          message={message}
        />
        : null}
      <FileDrop fileHandler={spreadFiles}/>
      <div>
        <h4>Files</h4>
        <ul>{fileList}</ul>
      </div>
    </>
  )
}

export default UploadForm
