import React from 'react'

import File from './File'



interface FileSetProps {
  files: { name: string }[];
}


const FileSet: React.FC<FileSetProps> = ({ files }) => {
  return (
    <>
      {!files ? '' : files.map(( val, idx ) =>
        <File 
          key={idx}
          name={`Doc ${val.name}`}
          size={`${idx}00kb`}
          />
      )}
    </>
  )
} 

export default FileSet
