import React from 'react'
import Pixel from './Pixel'
import { connect } from 'react-redux'
import { draw, startStroke, endStroke } from './paintSlice'
import { State } from './store'
import { makeStyles, createStyles } from '@material-ui/styles'
import { ThemeType } from './theme'

const mapState = ({ paint: state }: State) => ({
  grid: state.canvas,
  drawing: state.drawing,
})

const useStyles = makeStyles<ThemeType, { rows: number; cols: number }>(theme =>
  createStyles({
    container: {
      display: 'grid',
      borderStyle: 'solid',
      borderColor: 'black',
      gridTemplateRows: ({ rows }) => `repeat(${rows}, 1fr)`,
      gridTemplateColumns: ({ cols }) => `repeat(${cols}, 1fr)`,
      gridGap: '3px',
      margin: 'auto',

      width: '70vh',
      // width is limiting
      [`@media (max-aspect-ratio: 1/1)`]: {
        width: '70%',
        [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
          width: '100%',
        },
      },
    },
  })
)

const mapDispatch = { onPaint: draw, startStroke, endStroke }

type Props = ReturnType<typeof mapState> & typeof mapDispatch

export const Canvas: React.FC<Props> = ({
  grid,
  onPaint,
  drawing,
  startStroke,
  endStroke,
}) => {
  const classes = useStyles({ rows: grid.length, cols: grid[0].length })
  return (
    <div
      className={classes.container}
      onMouseUp={e => {
        if (!(e.buttons & 1) && drawing) endStroke()
      }}
      onMouseEnter={e => {
        if (!(e.buttons & 1) && drawing) endStroke()
      }}
      onDragStart={e => e.preventDefault()}
      onDrop={e => e.preventDefault()}
    >
      {grid.map((row, x) =>
        row.map((px, y) => (
          <Pixel
            color={px}
            key={`${x},${y}`}
            onPaint={() => {
              if (!drawing) startStroke()
              onPaint({ x, y })
            }}
          />
        ))
      )}
    </div>
  )
}

export default connect(mapState, mapDispatch)(Canvas)
