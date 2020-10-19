import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react'


import { GraphQLContext } from '../App'
import UploadFiles from '../UploadFiles'

import { mockFilesUploadData, mockUploadFiles } from '../../__mocks__/query'


test('test: Upload mutation', async () => {
  // Mock methods in the Provider
  const handleDelete = jest.fn()
  const refetch = jest.fn()

  // Mock local onClick
  const mockClickHandler = jest.fn()
  render(
    <MockedProvider mocks={[mockUploadFiles]}  >
      <GraphQLContext.Provider value={
        {handleDelete, refetch}
        }
      >
        <UploadFiles files={mockFilesUploadData} handleSuccess={mockClickHandler} />
      </GraphQLContext.Provider>
    </MockedProvider>
  )

  
  fireEvent.click(screen.getByRole('button'))

  await waitFor(() => {
    expect(mockClickHandler).toHaveBeenCalled()
    expect(refetch).toHaveBeenCalled()
  })
})


