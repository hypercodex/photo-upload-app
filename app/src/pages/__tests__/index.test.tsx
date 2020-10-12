import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Index from '../index'

test('Index page has search input', () => {
  render(<Index />)
  expect(screen.getByRole('textbox').getAttribute('placeholder'))
    .toEqual('Search documents...')
})

test('Index page has upload button', () => {
  render(<Index />)
  expect(screen.getByRole('button'))
    .toHaveTextContent('Upload')
})

test('Index page has stats', () => {
  render(<Index />)
  // Zero documents
  expect(screen.getByText('0 documents')).toBeInTheDocument()
  // Zero Megabytes
  expect(screen.getByText('Total size: 0Mb')).toBeInTheDocument()
})


