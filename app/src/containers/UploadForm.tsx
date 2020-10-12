import React, { useState, useReducer } from 'react'
import type { FileRejection } from 'react-dropzone'

import UploadFiles from './UploadFiles'
import FileDrop from '../components/FileDrop'
import Message from '../components/Message'
import UploadTargets from '../components/UploadTargets'
import { toKilobytes } from '../lib'


interface Handler {
  (): void;
}


interface UploadState {
  acceptFiles: File[]; 
  rejectMessage: (string | undefined)[]; 
  rejectFiles: FileRejection[];
}

type Action =
  | { type: 'ADD_FILE', file: File } 
  | { type: 'REJECT_FILE', file: FileRejection, message: string } 
  | { type: 'CLEAR_REJECTED_FILE', index: number } 
  | { type: 'CLEAR' }


interface ReducerInterface {
  (
    state: UploadState,
    action: Action
  ): UploadState 
}

const UploadForm: React.FC<{handleCloseModal: Handler}> = ({handleCloseModal}) => {

  const initialState: UploadState = {
    acceptFiles: [],
    rejectMessage: [],
    rejectFiles: []
  }

  const reducer: ReducerInterface = (state, action) => {
    switch (action.type) {
      case 'ADD_FILE':
        return {
          ...state,
          acceptFiles: [...state.acceptFiles, action.file],
          rejectMessage: [...state.rejectMessage],
          rejectFiles: [...state.rejectFiles]
        }
      case 'REJECT_FILE':
        return {
          ...state,
          acceptFiles: [...state.acceptFiles],
          rejectMessage: [...state.rejectMessage, action.message ],
          rejectFiles: [...state.rejectFiles, action.file]
        }
      case 'CLEAR_REJECTED_FILE':
        return {
          ...state,
          acceptFiles: [...state.acceptFiles],
          rejectMessage: state.rejectMessage.filter((item, index) => {
            return index !== action.index
          }),
          rejectFiles: state.rejectFiles.filter((item, index) => {
            return index !== action.index
          })
        }
      case 'CLEAR':
        return {
          ...initialState
        }
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
    dispatch({type: 'CLEAR_REJECTED_FILE', index})
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

  const hasValidFiles = state.acceptFiles.length > 0 ? true : false

  const fileList = state.acceptFiles.map(( target: File ) => (
      <li key={target.name}>
        {target.name} - {toKilobytes(target.size)}
      </li>
    ))


  const hasInvalidFiles = state.rejectFiles.length > 0 ? true : false

  const invalidFiles = state.rejectFiles.map(
    (file: FileRejection, index: number) => { 
      return ( 
        <Message
          key={file.file.name}
          clickHandler={() => handleClearFile(index)}
          message={
            `Error with file: ${file.file.name} - ${file.errors[0].message}.`
          }
        />
      )
    }
  )

  return (
    <>
      <FileDrop
        handleRejectFile={handleRejectFile}
        handleAddFile={handleAddFile}
      />
      <UploadFiles
        handleSuccess={handleCloseModalClear}
        files={state.acceptFiles}
      />
      <UploadTargets 
        hasValidFiles={hasValidFiles}
        fileList={fileList}
        hasInvalidFiles={hasInvalidFiles}
        invalidFiles={invalidFiles}
      />
    </>
  )
}

export default UploadForm
