import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { Teal } from './theme'
import { ThemeProvider } from '@material-ui/styles'
// import 'normalize.css'

render(
  <ThemeProvider theme={Teal}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
