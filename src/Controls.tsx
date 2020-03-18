import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { undo, redo, changeColor, resize } from './paintSlice'
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
} from '@fortawesome/free-solid-svg-icons'

const mapState = ({ paint: state }: State) => ({
  hasUndo: !!state.undo.length,
  hasRedo: !!state.redo.length,
  color: state.color,
})

const mapDispatch = { undo, redo, changeColor, resize }

type Props = ReturnType<typeof mapState> & typeof mapDispatch

const useStyles = makeStyles<ThemeType>(theme =>
  createStyles({
    btn: {
      ...theme.typography.button,
      ...theme.shape,
      boxShadow: theme.shadows[1],
      padding: '.375rem .75rem',
      margin: theme.spacing.unit,
      borderStyle: 'outset',
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.secondary.main,
      '&:disabled': {
        color: theme.palette.text.disabled,
        borderColor: theme.palette.action.disabled,
        backgroundColor: theme.palette.action.disabledBackground,
      },
      '&:not(:disabled):hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.action.hover,
      },
      '&:not(:disabled):active': {
        backgroundColor: theme.palette.action.active,
        boxShadow: theme.shadows[0],
      },
    },
  })
)

export const Controls: React.FC<Props> = ({
  undo,
  redo,
  hasUndo,
  hasRedo,
  color,
  changeColor,
  resize,
}) => {
  const [loadOpen, setLoadOpen] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null!)
  const [fileContent, setFileContent] = useState<PaintFile | undefined>()
  const classes = useStyles()
  return (
    <>
      <Modal
        open={loadOpen}
        onClose={() => {
          setLoadOpen(false)
        }}
        header="File Manager"
        footer={
          <>
            <button className={classes.btn}>Open</button>
            <button className={classes.btn}>Download</button>
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
              try {
                const content:
                  | PaintFile
                  | object
                  | undefined = await (file as any)?.text().then(JSON.parse)
                if (!isPaintFile(content))
                  throw new Error('JSON file but not a paint file')
                setFileContent(content)
              } catch (e) {
                alert(e)
                fileInput.current.value = ''
              }
            }}
          />
        </label>
        <FileManager shouldUpdate={loadOpen} />
      </Modal>

      <div>
        <button className={classes.btn} onClick={() => setLoadOpen(true)}>
          <FontAwesomeIcon icon={FileManagerIcon} />
        </button>
        <button
          className={classes.btn}
          onClick={() => undo()}
          disabled={!hasUndo}
        >
          <FontAwesomeIcon icon={UndoIcon} />
        </button>
        <button
          className={classes.btn}
          onClick={() => redo()}
          disabled={!hasRedo}
        >
          <FontAwesomeIcon icon={RedoIcon} />
        </button>
        <button
          className={classes.btn}
          onClick={() => resize({ x: 5, y: 5, color: '#ffffff' })}
        >
          5x5
        </button>
        <button
          className={classes.btn}
          onClick={() => resize({ x: 10, y: 10, color: '#ffffff' })}
        >
          10x10
        </button>
        <label className={classes.btn}>
          <FontAwesomeIcon icon={ColorIcon} color={color} />
          <input
            type="color"
            style={{ display: 'none' }}
            onChange={e => changeColor(e.target.value)}
            value={color}
          />
        </label>
      </div>
    </>
  )
}
export default connect(mapState, mapDispatch)(Controls)
