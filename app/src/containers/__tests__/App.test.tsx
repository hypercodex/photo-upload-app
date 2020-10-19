import React from 'react'
import { act } from 'react-dom/test-utils'
import { MockedProvider } from '@apollo/client/testing'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  findByText,
  findAllByText
} from '@testing-library/react'


import App from '../App'
import StateContainer, { StateContext } from '../StateContainer' 

import {
  mockAllFiles,
  mockSearchFiles,
  mockDeleteFile
} from '../../__mocks__/query'

const mockHandleSetSearch = jest.fn()
const mockHandleClearSearch = jest.fn()
const mockSetStats = jest.fn()

const mockState = {
  state: {
    searchQuery: '',
    fileCount: 0,
    totalSize: 0
  },
  dispatch: () => null,
  stateActions: {
      handleSetSearch: mockHandleSetSearch,
      handleClearSearch: mockHandleClearSearch,
      setStats: mockSetStats
  }
}

test('test: App base case allData', async () => {

  render(
    <StateContext.Provider value={mockState} >
      <MockedProvider mocks={[ mockAllFiles, mockDeleteFile ]} addTypename={false}  >
        <App  />
      </MockedProvider>
    </StateContext.Provider>
  )
  
  // Initial "loading" state before data is returned from API
  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByText('0 documents')).toBeInTheDocument()
  expect(screen.getByText('Total size: 0Mb')).toBeInTheDocument()

  // After data is loaded
  const doc1 = await screen.findByText('Doc 1')
  expect(doc1).toBeTruthy()
  const doc2 = await screen.findByText('Doc 2')
  expect(doc2).toBeTruthy()
  
  const deleteButtons = await screen.findAllByText('Delete')
  expect(deleteButtons).toHaveLength(2)


  // Test that the updated file stats are dispatched to state
  await waitFor(() => {
    expect(mockSetStats).toHaveBeenCalled()
    expect(mockSetStats).toHaveBeenCalledWith(2, 200)
  })

})

const mockSearchState = {
  ...mockState,
  state: {
    ...mockState.state,
    searchQuery: 'something'
  }
}

test('test: App searchFiles', async () => {

  render(
    <StateContext.Provider value={mockSearchState}>
      <MockedProvider mocks={[ mockAllFiles, mockSearchFiles ]} addTypename={false}  >
        <App  />
      </MockedProvider>
    </StateContext.Provider>
  )

  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  })

  // Set stats action is called when there are query results
  await waitFor(() => {
    expect(mockSetStats).toHaveBeenCalled()
    expect(mockSetStats).toHaveBeenCalledWith(2, 200)
  })

  // Canging text in the textbox dispatches set search action
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'something else' } })
  await waitFor(() => {
    expect(mockHandleSetSearch).toHaveBeenCalled()
    expect(mockHandleSetSearch).toHaveBeenCalledTimes(1)
  })
})



test('test: App search functionality and dispatch to StateContainer', async () => {

  render(
    <MockedProvider mocks={[ mockAllFiles, mockAllFiles, mockSearchFiles ]} addTypename={false}  >
      <StateContainer>
        <App  />
      </StateContainer>
    </MockedProvider>
  )

  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  })
  expect(screen.getAllByText(/Doc.*/)).toHaveLength(2)

  // Changing text in the textbox dispatches set search action
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'something' } })
  await waitFor(() => {
    expect(screen.getByRole('textbox')).toHaveValue('something')
    expect(screen.getAllByText(/Doc.*/)).toHaveLength(1)
  })

  // Pressing the Escape key clears the search box and state
  fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape', code: 'Escape' } )

  await waitFor(() => {
    expect(screen.getByRole('textbox')).toHaveValue('')
    expect(screen.getAllByText(/Doc.*/)).toHaveLength(2)
  })

})


