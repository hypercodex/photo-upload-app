import React from 'react'

import type { File as FileInterface } from '../../../api/src/types'

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
          idx={idx}
          file={file}
          />
      )}
    </>
  )
} 

export default FileSet
