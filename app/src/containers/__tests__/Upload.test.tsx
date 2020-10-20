import React from 'react'
import { act } from 'react-dom/test-utils'
import { MockedProvider } from '@apollo/client/testing'
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react'


import { GraphQLContext } from '../App'
import UploadFiles from '../UploadFiles'
import UploadForm from '../UploadForm'

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


// Test drop zone and upload form state


// Drop zone helpers
const mockData = (files: File[]) => ({
  dataTransfer: {
    files,
    items: files.map((file: File) => ({
      kind: 'file',
      type: file.type,
      getAsFile: () => file
    })),
    types: ['Files']
  }
})

const flushPromises = async (rerender, ui) => {
  await act(async () => await waitFor(() => rerender(ui)))
}

const dispatchEvent = (node: Element | null, type: string, data: any) => {
  if (!node) {
    return
  }
  const event = new Event(type, { bubbles: true })
  if (data) {
    Object.assign(event, data)
  }
  fireEvent(node, event)
}


test('test: Upload functionality', async () => {

  const mockClickHandler = jest.fn()

  const ui = (
    <MockedProvider mocks={[mockUploadFiles]} addTypename={false} >
      <UploadForm handleCloseModal={mockClickHandler} />
    </MockedProvider>
  )

  const { container, rerender } = render(ui)

  const dropzone = container.querySelector('div > div')

  // Add file to the upload targets
  const file = new File([new Blob()], 'mockFile.png', { type: 'image/png' })
  const data = mockData([file])
  dispatchEvent(dropzone, 'drop', data)
  await flushPromises(rerender, ui) 
  expect(screen.getByText(/mockFile\.png/)).toBeInTheDocument()


  // Add a file that should get rejected because of type 
  const fileRejectType = new File([new Blob()], 'mockFile.webp', { type: 'image/webp' })
  const dataRejectType = mockData([fileRejectType]) 
  dispatchEvent(dropzone, 'drop', dataRejectType)
  await flushPromises(rerender, ui) 
  expect(screen.getByText(/Error with file: mockFile\.webp/)).toBeInTheDocument()

  // Close the rejected file error message
  fireEvent.click(screen.getByText('+'))
  await waitFor(() => {
    expect(screen.queryByText(/Error with file.*/)).not.toBeInTheDocument()
  })

  // Add a file that should get rejected because of size 
  const twentyMb = 20000000
  const fileRejectSize = new File([new Blob([new ArrayBuffer(twentyMb)])], 'mockFile.jpeg', { type: 'image/jpeg' })
  const dataRejectSize = mockData([fileRejectSize]) 
  dispatchEvent(dropzone, 'drop', dataRejectSize)
  await flushPromises(rerender, ui) 
  expect(screen.getByText(/Error with file: mockFile\.jpeg/)).toBeInTheDocument()

  // Close the rejected file error message
  fireEvent.click(screen.getByText('+'))
  await waitFor(() => {
    expect(screen.queryByText(/Error with file.*/)).not.toBeInTheDocument()
  })

  // Should be one file in our upload targets currently
  expect(container.querySelectorAll('li')).toHaveLength(1)
  expect(screen.getAllByText(/.*mockFile.*/)).toHaveLength(1)

  // Add an additional file to match our mock query
  const fileAdditional = new File([new Blob()], 'mockFile.jpeg', { type: 'image/jpeg' })
  const dataAddtional = mockData([fileAdditional])
  dispatchEvent(dropzone, 'drop', dataAddtional)
  await flushPromises(rerender, ui) 

  // Check that we now have two files targeted for upload
  expect(screen.getByText(/mockFile\.jpeg/)).toBeInTheDocument()
  expect(container.querySelectorAll('li')).toHaveLength(2)
  expect(screen.getAllByText(/.*mockFile.*/)).toHaveLength(2)

  // Figure out how to mock files for upload in the MockedProvider...
})
