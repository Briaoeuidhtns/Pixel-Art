import React from 'react'

import { Provider } from 'react-redux'
import Canvas from './Canvas'
import Controls from './Controls'
import store from './store'
import { resize } from './paintSlice'

import { ThemeType } from './theme'
import { makeStyles, createStyles } from '@material-ui/styles'

store.dispatch(resize({ x: 10, y: 10, color: '#fff' }))
const useStyles = makeStyles<ThemeType>(theme =>
  createStyles({
    '@global': {
      html: { boxSizing: 'border-box' },
      '*, *::before, *::after': {
        boxSizing: 'inherit',
      },
      body: {
        margin: 0,
        color: theme.palette.text.primary,
        ...theme.typography.body2,
        backgroundColor: theme.palette.background.default,
        '@media print': {
          backgroundColor: theme.palette.common.white,
        },
        '&::backdrop': {
          backgroundColor: theme.palette.background.default,
        },
      },
    },
  })
)

const App = () => {
  useStyles()
  return (
    <Provider {...{ store }}>
      <Controls />
      <Canvas />
    </Provider>
  )
}

export default App
