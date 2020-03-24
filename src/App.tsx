import React from 'react'

import { Provider } from 'react-redux'
import Canvas from './Canvas'
import Controls from './Controls'
import store from './store'
import { resize } from './paintSlice'

import { ThemeType } from './theme'
import { makeStyles, createStyles } from '@material-ui/styles'

// store.dispatch(resize({ x: 10, y: 10, color: '#fff' }))
const useStyles = makeStyles<ThemeType>(theme =>
  createStyles({
    '@global': {
      html: { boxSizing: 'border-box' },
      '*, *::before, *::after': {
        boxSizing: 'inherit',
        margin: 0,
        padding: 0,
      },
      body: {
        margin: theme.spacing.unit,
        color: theme.palette.text.primary,
        ...theme.typography.body2,
        backgroundColor: theme.palette.background.default,
        '&::backdrop': {
          backgroundColor: theme.palette.background.default,
        },
        overflow: 'hidden',
      },
    },
    main: { textAlign: 'center' },
  })
)

const App = () => {
  const classes = useStyles()
  return (
    <Provider {...{ store }}>
      <div className={classes.main}>
        <Controls />
        <Canvas />
      </div>
    </Provider>
  )
}

export default App
