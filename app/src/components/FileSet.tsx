import React from 'react'

import type { File as FileInterface } from '../../../api/src/types'

import File from './File'



interface FileSetProps {
  files: FileInterface[];
}

const toKilobytes = (bytes: number) => {
  return `${Math.round(bytes/1000).toString()}kb`
}

const FileSet: React.FC<FileSetProps> = ({ files }) => {
  return (
    <>
      {!files ? '' : files.map(( file, idx ) =>
        <File 
          key={idx}
          id={file.id}
          name={`Doc ${++idx}`}
          size={toKilobytes(file.size)}
          />
      )}
    </>
  )
} 

export default FileSet
