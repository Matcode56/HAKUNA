import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './App'

test('renders Accueil h1', () => {
  render(<App />)
  const linkElement = screen.getByText('Accueil')
  expect(linkElement).toBeInTheDocument()
})
