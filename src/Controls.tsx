import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { undo, redo, changeColor, resize, load, download } from './paintSlice'
import { State } from './store'
import Modal from './components/modal'
import { FileManager } from './FileManager'
import { PaintFile, isPaintFile } from './validators'
import { makeStyles, createStyles } from '@material-ui/styles'
import { ThemeType } from './theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTint as ColorIcon,
  faArchive as FileManagerIcon,
  faUndo as UndoIcon,
  faRedo as RedoIcon,
  faSave as SaveIcon,
} from '@fortawesome/free-solid-svg-icons'
import { FileSave } from './FileSave'
import { uploadFile, fetchFilesList } from './fileSlice'

const useStyles = makeStyles<ThemeType>(theme =>
  createStyles({
    btn: {
      ...theme.typography.button,
      ...theme.shape,
      borderWidth: '2px',
      boxShadow: theme.shadows[1],
      padding: '.375rem .75rem',
      margin: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 2,
      borderStyle: 'outset',
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.secondary.main,
      minWidth: 64,
      lineHeight: 'normal',
      display: 'inline-block',
      userSelect: 'none',
      '&:disabled': {
        color: theme.palette.text.disabled,
        borderColor: theme.palette.action.disabled,
        backgroundColor: theme.palette.action.disabledBackground,
      },
      '&:not(:disabled):hover': {
        cursor: 'pointer',
        filter: `brightness(${1 - theme.palette.action.hoverOpacity})`,
      },
      '&:not(:disabled):active': {
        filter: `brightness(${1 - theme.palette.action.activeOpacity})`,
        boxShadow: theme.shadows[0],
      },
    },
    colorIcon: {
      filter: `drop-shadow(0px 0px 5px ${theme.palette.grey[600]})`,
    },
  })
)

export const Controls: React.FC = () => {
  const [loadOpen, setLoadOpen] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null!)
  const [fileName, setFileName] = useState('')
  const classes = useStyles()
  const dispatch = useDispatch()
  const hasUndo = useSelector((state: State) => !!state.paint.past.length)
  const hasRedo = useSelector((state: State) => !!state.paint.future.length)
  const color = useSelector((state: State) => state.paint.present.color)

  const fileManagerModal = (
    <Modal
      open={loadOpen}
      onClose={() => {
        setLoadOpen(false)
        setFileName('')
      }}
      header="File Manager"
      footer={
        <>
          <button
            className={classes.btn}
            onClick={() => {
              dispatch(load(fileName))
              setLoadOpen(false)
            }}
            disabled={!fileName}
          >
            Open
          </button>
          <button
            className={classes.btn}
            onClick={() => download(fileName)}
            disabled={!fileName}
          >
            Download
          </button>
        </>
      }
    >
      <label className={classes.btn}>
        Upload File
        <input
          ref={fileInput}
          type="file"
          style={{ display: 'none' }}
          accept=".paint"
          onChange={async e => {
            const file = e.target.files?.[0]
            let uploaded: PaintFile | object | null = null
            try {
              if (file != null) {
                uploaded = {
                  name: file.name,
                  data: JSON.parse(await (file as any).text()),
                }
                if (!isPaintFile(uploaded))
                  throw new Error('JSON file but not a paint file')
                await uploadFile(uploaded)
                dispatch(fetchFilesList())
                alert(`Uploaded ${file.name}`)
              }
            } catch (e) {
              alert(e)
              console.log({ error: e, file: uploaded })
            }
            fileInput.current.value = ''
          }}
        />
      </label>
      <FileManager
        file={fileName}
        onChange={setFileName}
        shouldUpdate={loadOpen}
      />
    </Modal>
  )

  return (
    <>
      {fileManagerModal}
      <FileSave
        buttonClassName={classes.btn}
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
      />
      <div>
        <button className={classes.btn} onClick={() => setLoadOpen(true)}>
          <FontAwesomeIcon icon={FileManagerIcon} />
        </button>
        <button className={classes.btn} onClick={() => setSaveOpen(true)}>
          <FontAwesomeIcon icon={SaveIcon} />
        </button>
        <button
          className={classes.btn}
          onClick={() => dispatch(undo())}
          disabled={!hasUndo}
        >
          <FontAwesomeIcon icon={UndoIcon} />
        </button>
        <button
          className={classes.btn}
          onClick={() => dispatch(redo())}
          disabled={!hasRedo}
        >
          <FontAwesomeIcon icon={RedoIcon} />
        </button>
        <button
          className={classes.btn}
          onClick={() => dispatch(resize({ x: 5, y: 5, color: '#ffffff' }))}
        >
          5x5
        </button>
        <button
          className={classes.btn}
          onClick={() => dispatch(resize({ x: 10, y: 10, color: '#ffffff' }))}
        >
          10x10
        </button>
        <label className={classes.btn}>
          <FontAwesomeIcon
            icon={ColorIcon}
            color={color}
            className={classes.colorIcon}
          />
          <input
            type="color"
            style={{ display: 'none' }}
            onChange={e => dispatch(changeColor(e.target.value))}
            value={color}
          />
        </label>
      </div>
    </>
  )
}
export default Controls
