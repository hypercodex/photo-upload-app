import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'


import style from './FileDrop.module.scss'

interface Handler {
  (file: Blob): void;
}

interface FileDropProps {
  fileHandler: Handler;
}

const FileDrop: React.FC<FileDropProps> = ({ fileHandler }) => {
  
  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)

      fileHandler(file)
    })
    
  }, [fileHandler])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div className={style.dropTarget} {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag and drop some files here, or click to select files</p>
    </div>
  )
}

export default FileDrop
