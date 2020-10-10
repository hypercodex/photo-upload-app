import React from 'react'

import type { File as FileInterface } from '../../../api/src/types'

import { toKilobytes } from '../lib'
import File from './File'



interface FileSetProps {
  files: FileInterface[];
}

const FileSet: React.FC<FileSetProps> = ({ files }) => {
  return (
    <>
      {!files ? '' : files.map(( file, idx ) =>
        <File 
          key={file.id}
          id={file.id}
          name={`Doc ${++idx}`}
          size={toKilobytes(file.size)}
          />
      )}
    </>
  )
} 

export default FileSet
