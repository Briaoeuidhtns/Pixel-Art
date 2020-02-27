import { configureStore, Action } from '@reduxjs/toolkit'
import paint from './paintSlice'
import files from './fileSlice'
import { ThunkAction } from 'redux-thunk'

const store = configureStore({ reducer: { paint, files } })

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export default store

export type AppThunk = ThunkAction<void, State, unknown, Action<string>>
