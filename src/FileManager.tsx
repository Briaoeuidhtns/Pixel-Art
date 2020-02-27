import React, { useEffect } from 'react'
import { fetchFilesList } from './fileSlice'
import { useSelector, useDispatch } from 'react-redux'
import { State, Dispatch } from './store'

interface Props {
  shouldUpdate: any
}
export const FileManager: React.FC<Props> = ({ shouldUpdate }) => {
  const dispatch = useDispatch<Dispatch>()
  const { files } = useSelector(({ files }: State) => files)
  useEffect(() => {
    if (shouldUpdate) dispatch(fetchFilesList())
  }, [dispatch, shouldUpdate])
  const has = files?.length || 0
  return (
    <select disabled={!has}>
      <option value="">
        -- {has ? 'Please choose a file' : 'No available files'} --
      </option>
      {files?.map(f => (
        <option value={f}>{f}</option>
      ))}
    </select>
  )
}
export default FileManager
