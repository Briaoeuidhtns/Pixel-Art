import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { identity } from 'lodash'
import { AppThunk } from './store'
import { PaintFile } from './validators'

interface InitialState {
  files?: string[]
}

const fileSlice = createSlice({
  name: 'files',
  initialState: identity<InitialState>({}),

  reducers: {
    loadFilesSuccess(state, { payload: files }: PayloadAction<string[]>) {
      state.files = files
    },
  },
})

export const { loadFilesSuccess } = fileSlice.actions

export default fileSlice.reducer

interface FileResponse {
  files: string[]
}

interface ErrorResponse {
  msg: string
}

const isFileResponse = (val: any): val is FileResponse => val.files != null

export const fetchFilesList = (): AppThunk => async dispatch => {
  let fileList: FileResponse | ErrorResponse = { msg: 'no response' }
  try {
    const response = await fetch('./api/list.php')
    fileList = await response.json()

    if (isFileResponse(fileList)) dispatch(loadFilesSuccess(fileList.files))
    else throw new Error(fileList.msg)
  } catch (err) {
    console.error(fileList)
    console.error(err)
  }
}

export const uploadFile = async (file: PaintFile) => {
  const response = await fetch('./api/save.php', {
    method: 'POST',
    body: JSON.stringify(file),
  })

  if (response.status !== 201) throw Error(await response.text())
}
