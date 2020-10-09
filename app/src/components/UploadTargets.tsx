import React from 'react'

import style from './UploadTargets.module.scss'


const UploadTargets: React.FC<any> = ({
  hasValidFiles,
  fileList,
  hasInvalidFiles,
  invalidFilesList
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
          {invalidFilesList}
        </>
        : null }
    </div>
  )
}

export default UploadTargets
