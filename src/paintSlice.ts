import { createSlice, AnyAction, Reducer, createAction } from '@reduxjs/toolkit'
import { AppThunk } from './store'
import { identity } from 'lodash'
import { PaintFile, isPaintFile } from './validators'
import save from './util/save'

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
    // Array creates an empty array of length 5, which just has 5 empty slots.
    // Spreading it makes it `map`pable
    canvas: [...Array(5)].map(() => Array(5).fill('#fff')),
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
    loadSuccess: {
      reducer(state, { payload: grid }) {
        state.canvas = grid
      },
      prepare(grid: Grid) {
        return { payload: grid, ...UNDOABLE, error: undefined }
      },
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
    // GRADING: ACTION
    // Added from the outside using dispatch
    if (isUndoable(action))
      return { past: [present, ...past], present: next, future: [] }
    return { ...state, present: next }
  }
}

export const load = (name: string): AppThunk => async dispatch => {
  try {
    const response = await fetch(
      './api/load.php?' + new URLSearchParams({ name })
    )
    const file: PaintFile | unknown = await response.json()

    if (isPaintFile(file)) dispatch(paintSlice.actions.loadSuccess(file.data))
    else throw new Error(JSON.stringify(file))
  } catch (err) {
    console.error(err)
  }
}

export const download = async (name: string) => {
  try {
    const response = await fetch(
      './api/load.php?' + new URLSearchParams({ name })
    )
    const file: PaintFile | unknown = await response.json()

    console.log(file)
    if (isPaintFile(file))
      save(
        file.name,
        new Blob([JSON.stringify(file.data)], { type: 'application/json' })
      )
    else throw new Error(JSON.stringify(file))
  } catch (err) {
    console.error(err)
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
