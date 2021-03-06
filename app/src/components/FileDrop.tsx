import React, {useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
import type { FileRejection } from 'react-dropzone'


import style from './FileDrop.module.scss'


const MAX_FILE_SIZE = 10 * 1000000

interface HandleAddFile {
  (file: File): void;
}
interface HandleRejectFile {
  (file: FileRejection, message: string): void;
}


interface FileDropProps {
  handleAddFile: HandleAddFile;
  handleRejectFile: HandleRejectFile
}

const FileDrop: React.FC<FileDropProps> = ({ handleAddFile, handleRejectFile }) => {
  
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    acceptedFiles.forEach((file) => {
      handleAddFile(file)
    })
    const rejectReasons = ['file-invalid-type', 'file-too-large']
    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        const reject = () => {
          handleRejectFile(
            file,
            `Error with file: ${file.file.name} - ${err.message}.`
          )
        }
        if (rejectReasons.some(e => e === err.code)) {
          reject()
        }
      })
    })
  }, [handleRejectFile, handleAddFile])



  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: ['image/jpeg', 'image/png'],
    maxSize: MAX_FILE_SIZE,
    maxFiles: 6
  })

  return (
    <div className={style.dropTarget} {...getRootProps()}>
      <input {...getInputProps()} />
      <p>
        Drag and drop some files here, or click to select files.
        <br/>
        <br/>
        A total of 6 files can be uploaded at a time.
      </p>
      <p></p>
    </div>
  )
}

export default FileDrop
