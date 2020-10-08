import React, { useState, useReducer } from 'react'
import type { FileRejection } from 'react-dropzone'

import UploadHead from './UploadHead'
import FileDrop from './FileDrop'
import Message from './Message'
import UploadFiles from './UploadFiles'

import style from './UploadForm.module.scss'

interface Handler {
  (): void;
}

interface UploadFormProps {
  handleCloseModal: Handler;
}

interface FileState {
  file: File,
  message: string;
  valid: boolean;
}

type Action = {
  type: 'ADD_FILE',
  file: File
} | {
  type: 'REJECT_FILE',
  file: FileRejection,
  message: string 
} | {
  type: 'CLEAR_FILE',
  index: number
} | {
  type: 'CLEAR'
}

interface ReducerInterface {
  (state: FileState[], action: Action): FileState[]
}

const UploadForm: React.FC<UploadFormProps> = ({handleCloseModal}) => {

  const initialState: FileState[] = []

  // @ts-ignore
  const reducer: ReducerInterface = (state, action) => {
    switch (action.type) {
      case 'ADD_FILE':
        return [
          ...state,
        {file: action.file, message: '', valid: true}
       ]
      case 'REJECT_FILE':
        return [
          ...state,
        {file: action.file, message: action.message, valid: false}
       ]
      case 'CLEAR_FILE':
        return state.filter((item: FileState, index: number) => index !== action.index)
      case 'CLEAR':
        return []
      default:
        throw new Error()
    }
  }

  const handleAddFile = (file: File) => {
    dispatch({type: 'ADD_FILE', file})
  }

  const handleRejectFile = (file: FileRejection, message: string) => {
    dispatch({type: 'REJECT_FILE', file, message})
  }

  const handleClearFile = (index: number) => {
    dispatch({type: 'CLEAR_FILE', index})
  }

  const handleClear = () => {
    dispatch({type: 'CLEAR'})
  }
  
  const [state, dispatch] = useReducer(reducer, initialState)


  // Extend handleCloseModal
  const handleCloseModalClear = () => {
    handleClear()
    handleCloseModal()
  }


  // Valid Files
  const filesValid = state.filter(file => file.valid === true)

  const hasValidFiles = filesValid.length > 0 ? true : false

  const fileList = state.map(target => (
    target.valid ?
      <li key={target.file.name}>
        {target.file.name} - {target.file.size} bytes
      </li>
    :
     null
  )).filter(value => value !== null)

  // Invalid Files
  const filesInvalid = state.filter(file => file.valid !== true)

  const hasInvalidFiles = filesInvalid.length > 0 ? true : false

  const invalidFilesList = state.map((file, index) => ( 
    !file.valid ?  
    <Message
      key={index}
      clickHandler={() => handleClearFile(index)}
      message={file.message}
    />
    : null
  )).filter(value => value !== null)

  return (
    <>
      <UploadHead clickHandler={handleCloseModalClear} />
      <FileDrop handleRejectFile={handleRejectFile} handleAddFile={handleAddFile}/>
      <UploadFiles files={filesValid.map(f => f.file)} />
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
    </>
  )
}

export default UploadForm
