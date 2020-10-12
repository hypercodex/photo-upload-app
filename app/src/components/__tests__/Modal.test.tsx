import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { render, screen, fireEvent, queryByText } from '@testing-library/react'

import Modal from '../Modal'

// Put a modal target div in the document root
const modalRoot = document.createElement('div')
modalRoot.setAttribute('id', 'modal')
document.body.appendChild(modalRoot)

test('Open and close modal functionality', () => {
  /* const { baseElement } = render(<Modal />) */
  const { getByText } = render(
    <MockedProvider>
      <Modal />
    </MockedProvider>
  )

  // Assert open trigger 
  expect(getByText('Upload')).toBeTruthy()

  // Act => open modal
  fireEvent.click(screen.getByText('Upload'))

  // Modal renders
  expect(getByText('File Uploader')).toBeTruthy()

  // Assert close trigger
  expect(getByText('+')).toBeTruthy()

  // Act => close modal
  fireEvent.click(screen.getByText('+'))

  // Assert modal closes
  expect(screen.queryByText('File Uploader')).not.toBeInTheDocument()

})



