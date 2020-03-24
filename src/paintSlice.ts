import { createSlice, AnyAction, Reducer, createAction } from '@reduxjs/toolkit'
import { identity } from 'lodash'

export type Color = string

export type Grid = Color[][]

interface InitialState {
  canvas: Grid
  color: Color
  drawing: boolean
}

const paintSlice = createSlice({
  name: 'paint',
  initialState: identity<InitialState>({
    canvas: [['#fff']],
    color: '#000000',
    drawing: false,
  }),

  reducers: {
    draw(state, { payload: { x, y } }) {
      state.canvas[x][y] = state.color
    },
    resize: {
      reducer(state, { payload: { x, y, color } }) {
        state.canvas = [...Array(y)].map(() =>
          Array(x).fill(color || state.color)
        )
      },
      prepare({ x, y, color }: { x: number; y: number; color: string }) {
        return {
          payload: { x, y, color },
          ...UNDOABLE,
          error: undefined,
        }
      },
    },
    changeColor: {
      reducer(state, { payload: color }) {
        state.color = color
      },
      prepare(color) {
        return {
          payload: color,
          ...UNDOABLE,
          error: undefined,
        }
      },
    },
    startStroke: {
      reducer(state) {
        state.drawing = true
      },
      prepare() {
        return { payload: {}, ...UNDOABLE }
      },
    },
    endStroke(state) {
      state.drawing = false
    },
  },
})

// GRADING: COMMAND
// Undoable actions inherit from this prototype
// Definitions are above in createSlice under the `prepare` fields
const UNDOABLE = { meta: { undoable: true } } as const

type UndoableAction = AnyAction & typeof UNDOABLE

export const isUndoable = (action: AnyAction): action is UndoableAction =>
  !!action.meta?.undoable

interface UndoState<S> {
  past: S[]
  present: S
  future: S[]
}

export const undo = createAction('paint/undo'),
  redo = createAction('paint/redo')

// GRADING: MANAGE
// Allows the actions that are not undoable to pass through
// Copies the current state if the action could be undone
// handles the undo and redo actions

// This will wrap the controller from createSlice
const manageUndo = <S>(reducer: Reducer<S, AnyAction>) => {
  const initialState: UndoState<S> = {
    past: [],
    present: reducer(undefined, { type: '@@INIT' }),
    future: [],
  }
  return (state: UndoState<S> = initialState, action: AnyAction) => {
    const { past, present, future } = state
    if (undo.match(action)) {
      const [previous, ...newPast] = past
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      }
    }

    if (redo.match(action)) {
      const [next, ...newFuture] = future
      return {
        past: [present, ...past],
        present: next,
        future: newFuture,
      }
    }

    const next = reducer(present, action)
    if (present === next) return state // Possibly prevent extra draws
    if (isUndoable(action))
      return { past: [present, ...past], present: next, future: [] }
    return { ...state, present: next }
  }
}

export const {
  draw,
  resize,
  changeColor,
  startStroke,
  endStroke,
} = paintSlice.actions

// Wrap the manager for events to make it react to the undo and redo actions
export default manageUndo(paintSlice.reducer)
