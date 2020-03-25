import React, { useState } from 'react'
import Modal from './components/modal'
import { useSelector } from 'react-redux'
import { State } from './store'
import { uploadFile } from './fileSlice'
import { Grid } from './paintSlice'

interface Props {
  buttonClassName: string
}
export const FileSave: React.FC<React.ComponentPropsWithoutRef<typeof Modal> &
  Props> = ({ buttonClassName, onClose, ...props }) => {
  const [name, setName] = useState('file.paint')
  const data = useSelector<State, Grid>(state => state.paint.present.canvas)

  const close = () => {
    setName('file.paint')
    onClose()
  }
  return (
    <Modal
      {...props}
      onClose={close}
      header="Save"
      footer={
        <>
          <button className={buttonClassName} onClick={close}>
            Cancel
          </button>
          <button
            className={buttonClassName}
            onClick={() => {
              uploadFile({ name, data })
                .then(() => alert('File uploaded'))
                .catch(e => alert(e))
              close()
            }}
          >
            Save
          </button>
        </>
      }
    >
      <label>
        File name:
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
    </Modal>
  )
}
