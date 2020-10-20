
import { filesApi, filesQueryResult, fileDeleteResult } from './data'

import { UPLOAD_MUTATION } from '../containers/UploadFiles'
import {
  ALL_FILES,
  SEARCH_FILES,
  DELETE_MUTATION
} from '../containers/App' 


// Mock 



// Mock uploads input
export const mockFilesUploadData = [
  new File([new Blob()], 'mockFile1', { type: 'image/png' }),
  new File([new Blob()], 'mockFile2', { type: 'image/jpg' }),
]

const mockFilesUploadPayload = mockFilesUploadData.map(file => ({file, size: 0}))


// Mock graphql responses
export const mockAllFiles = {
  request: {
    query: ALL_FILES,
  },
  result: {
    data: {
      allFiles: filesQueryResult
    }
  }
}

export const mockSearchFiles = {
  request: {
    query: SEARCH_FILES,
    variables: { input: { search: 'something' }}
  },
  result: {
    data: {
      searchFiles: [ filesQueryResult[0] ]
    }
  }
}

export const mockDeleteFile = {
  request: {
    query: DELETE_MUTATION,
    variables: { input: { id: 'FILE_ID' }}
  },
  result: {
    data: {
      deleteFile: fileDeleteResult
    }
  }
}

export const mockUploadFiles = {
  request: {
    query: UPLOAD_MUTATION,
    variables: { input: { files: mockFilesUploadPayload }}
  },
  result: {
    data: {
      postFiles: mockFilesUploadPayload
    }
  }
}


