import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import { ThemeType } from './theme'

type Props = {
  color: string
  onPaint: () => unknown
  // pos: { x: number; y: number }
}

const useStyles = makeStyles<ThemeType, Omit<Props, 'onPaint'>>(theme =>
  createStyles({
    pixel: {
      backgroundColor: ({ color }) => color,
      cursor: 'crosshair',
      height: 0,
      paddingTop: '100%',
    },
  })
)

const Pixel: React.FC<Props> = ({ onPaint, ...props }) => {
  const classes = useStyles(props)

  return (
    <div
      className={classes.pixel}
      onMouseOver={e => {
        // Check if drawing is actually happening
        if (e.buttons & 1) onPaint()
      }}
      onMouseDown={() => onPaint()}
    />
  )
}

export default Pixel
