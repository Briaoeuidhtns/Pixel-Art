import { createSlice } from '@reduxjs/toolkit'
import { identity } from 'lodash'

export type Color = string

export type Grid = Color[][]

interface InitialState {
  canvas: Grid
  color: Color
  drawing: boolean
  undo: Grid[]
  redo: Grid[]
}

const paintSlice = createSlice({
  name: 'paint',
  initialState: identity<InitialState>({
    canvas: [],
    color: '#000000',
    drawing: false,
    undo: [],
    redo: [],
  }),

  reducers: {
    draw(state, { payload: { x, y } }) {
      state.canvas[x][y] = state.color
    },
    resize(state, { payload: { x, y, color } }) {
      state.canvas = [...Array(y)].map(() =>
        Array(x).fill(color || state.color)
      )
    },
    changeColor(state, { payload: color }) {
      state.color = color
    },
    startStroke(state) {
      state.drawing = true
      state.undo.push(state.canvas)
      state.redo = []
    },
    endStroke(state) {
      state.drawing = false
    },
    undo(state) {
      const cur = state.undo.pop()
      if (cur != null) {
        state.redo.push(state.canvas)
        state.canvas = cur
      }
    },
    redo(state) {
      const cur = state.redo.pop()
      if (cur != null) {
        state.undo.push(state.canvas)
        state.canvas = cur
      }
    },
  },
})

export const {
  draw,
  resize,
  changeColor,
  startStroke,
  endStroke,
  undo,
  redo,
} = paintSlice.actions

export default paintSlice.reducer
