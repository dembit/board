import React from 'react';
import { createMemoryHistory } from 'history';
import {  Router } from 'react-router-dom'
import { render, screen} from '@testing-library/react';
import App from './App';



describe('Test Route', () => {
    
  test('full app rendering/navigating', () => {
    const history = createMemoryHistory()
   
    render(<Router history={history}>
      <App />
    </Router>)

    expect(history.location.pathname).toBe("/")

    expect(screen.getByText(/content/i)).toBeInTheDocument()
  })

  

})

