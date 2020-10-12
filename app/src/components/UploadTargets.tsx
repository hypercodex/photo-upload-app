import React from 'react'

import style from './UploadTargets.module.scss'


const UploadTargets: React.FC<{
  hasValidFiles: boolean;
  fileList: JSX.Element[];
  hasInvalidFiles: boolean;
  invalidFiles: JSX.Element[]
}> = ({
  hasValidFiles,
  fileList,
  hasInvalidFiles,
  invalidFiles
}) => {
  return (
    <div className={style.targets}>
      {hasValidFiles ?
        <>
          <h4>Files</h4>
          <ul>{fileList}</ul>
        </>
        : null}
      {hasInvalidFiles ?
        <>
          <h4>File Errors</h4>
          {invalidFiles}
        </>
        : null }
    </div>
  )
}

export default UploadTargets
