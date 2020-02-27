import React from 'react'

type Props = { color: string; onPaint: () => unknown }

const Pixel: React.FC<Props> = ({ color, onPaint }) => (
  <td
    style={{
      width: '25px',
      height: '25px',
      border: '1px solid',
      backgroundColor: color,
    }}
    onMouseOver={e => {
      // Check if drawing is actually happening
      if (e.buttons & 1) onPaint()
    }}
    onMouseDown={() => onPaint()}
  ></td>
)

export default Pixel
