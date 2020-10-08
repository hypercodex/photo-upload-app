import React, { useState } from 'react'

import FileDrop from './FileDrop'
import Message from './Message'

import style from './UploadForm.module.scss'




const UploadForm: React.FC = () => {
  const [files, setFiles] = useState([])
  const [message, setMessage] = useState('Hello')

  return (
    <>
      {message ?
        <Message
          // @ts-ignore
          clickHandler={() => setMessage(undefined)}
          message={message}
        />
        : null}
      <FileDrop />
    </>
  )
}

export default UploadForm
