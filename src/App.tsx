import React from 'react'

import { Provider } from 'react-redux'
import Canvas from './Canvas'
import Controls from './Controls'
import store from './store'
import { resize } from './paintSlice'
import { ThemeProvider } from '@material-ui/styles'
import { Teal } from './theme'

store.dispatch(resize({ x: 10, y: 10, color: '#fff' }))

const App = () => (
  <Provider {...{ store }}>
    <ThemeProvider theme={Teal}>
      <Controls />
      <Canvas />
    </ThemeProvider>
  </Provider>
)

export default App
