import React from 'react'
import Pixel from './Pixel'
import { connect } from 'react-redux'
import { draw, startStroke, endStroke } from './paintSlice'
import { State } from './store'

const mapState = ({ paint: state }: State) => ({
  grid: state.canvas,
  drawing: state.drawing,
})

const mapDispatch = { onPaint: draw, startStroke, endStroke }

type Props = ReturnType<typeof mapState> & typeof mapDispatch

export const Canvas: React.FC<Props> = ({
  grid,
  onPaint,
  drawing,
  startStroke,
  endStroke,
}) => (
  <table
    onMouseUp={e => {
      if (!(e.buttons & 1) && drawing) endStroke()
    }}
    onMouseEnter={e => {
      if (!(e.buttons & 1) && drawing) endStroke()
    }}
    onDragStart={e => e.preventDefault()}
    onDrop={e => e.preventDefault()}
  >
    <tbody>
      {grid.map((row, x) => (
        <tr key={x}>
          {row.map((px, y) => (
            <Pixel
              color={px}
              onPaint={() => {
                if (!drawing) startStroke()
                onPaint({ x, y })
              }}
              key={y}
            />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

export default connect(mapState, mapDispatch)(Canvas)
