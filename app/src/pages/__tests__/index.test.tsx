import React from 'react'
import { render, screen } from '@testing-library/react'

import Home from '../index'

test('Basic test for homepage header', () => {
  render(<Home />)
  expect(screen.getByRole('heading'))
    .toHaveTextContent('Welcome to File Upload App!')
})



