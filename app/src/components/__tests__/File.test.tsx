import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { FetchMock } from 'jest-fetch-mock'

import { GraphQLContext } from '../../containers/App'
import File from '../File'


import { mockFile } from '../../__mocks__/data'


test('test: File component functionality', () => {

  // Mock methods in the Provider
  const handleDelete = jest.fn()
  const refetch = jest.fn()

  render(
    <GraphQLContext.Provider value={
      {handleDelete, refetch}
      } >
      <File idx={1} file={mockFile} />
    </GraphQLContext.Provider>
  )
  
  expect(screen.getByRole('button'))
    .toHaveTextContent('Delete')

  // Act
  fireEvent.click(screen.getByRole('button'))

  // Assert the button calls the provided mutation function
  expect(handleDelete).toHaveBeenCalled()
  expect(handleDelete).toHaveBeenCalledWith(mockFile['id'])
  expect(refetch).toHaveBeenCalled()
  
})
