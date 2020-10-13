import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import {
  render,
  screen,
  fireEvent,
  queryByText,
  getByText,
  waitFor
} from '@testing-library/react'


import { GraphQLContext } from '../App'
import UploadFiles, { MUTATION } from '../UploadFiles'
import { filesApi } from '../../mocks/mockData'


const fetchMock = fetch as FetchMock
beforeEach(() => { 
  fetchMock.doMock(req => {
    return new Promise((resolve, reject) => {
      return { token: 'double cookie token' }
    })
  })
})

// Mock files
const mockFiles = [
  new File([new Blob()], 'mockFile1', { type: 'image/png' }),
  new File([new Blob()], 'mockFile2', { type: 'image/jpg' }),
]

const files = mockFiles.map(file => ({file, size: 0}))

// Mock graphql response
const mockGQL = [
  {
    request: {
      query: MUTATION,
      variables: { input: { files }}
    },
    result: {
      data: {
        filesApi
      }
    }
  }
]


test('test: Upload mutation', async () => {
  // Mock methods in the Provider
  const handleDelete = jest.fn()
  const refetch = jest.fn()
  const setRefetch = jest.fn()

  // Mock local onClick
  const mockClickHandler = jest.fn()
  render(
    <MockedProvider mocks={mockGQL}  >
      <GraphQLContext.Provider value={
        {handleDelete, refetch, setRefetch}
        }
      >
        <UploadFiles files={mockFiles} handleSuccess={mockClickHandler} />
      </GraphQLContext.Provider>
    </MockedProvider>
  )

  
  fireEvent.click(screen.getByRole('button'))

  await waitFor(() => {
    expect(mockClickHandler).toHaveBeenCalled()
    expect(refetch).toHaveBeenCalled()
  })
})


