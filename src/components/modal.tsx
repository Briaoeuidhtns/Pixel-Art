import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes as Close } from '@fortawesome/free-solid-svg-icons'
import { ThemeType } from '../theme'

// somewhat from https://www.w3schools.com/howto/howto_css_modals.asp

const useStyles = makeStyles<ThemeType>(theme =>
  createStyles({
    modal: {
      display: props => ((props as any).open ? 'flex' : 'none'),
      flexDirection: 'column',
      position: 'fixed',
      zIndex: theme.zIndex.modal,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: theme.palette.common.black + 'a', // for transparency
      textAlign: 'initial',
    },

    modalContent: {
      backgroundColor: theme.palette.background.paper,
      margin: '15% auto',
      width: '80%',
      animationName: '$fadein',
      animationTimingFunction: theme.transitions.easing.easeIn,
      animationDuration: theme.transitions.duration.enteringScreen + 'ms',
    },

    modalHeader: {
      padding: '16px',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },

    headerText: {
      ...theme.typography.headline,
    },

    modalBody: { padding: '16px' },

    modalFooter: {
      display: 'flex',
      padding: '2px 16px',
      backgroundColor: theme.palette.primary.main,
      justifyContent: 'flex-end',
    },

    closeBtn: {
      float: 'right',
      justifyContent: 'flex-end',
      fontSize: '24px',
      fontWeight: 'bold',
      color: theme.palette.grey['A700'],
      '&:hover': {
        color: theme.palette.action.hover,
        cursor: 'pointer',
      },
    },

    '@keyframes fadein': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
  })
)

interface Props {
  open: boolean
  onClose: () => void
  header?: React.ReactNode
  footer?: React.ReactNode
}

const Modal: React.FC<Props> = ({
  open,
  onClose,
  header,
  children,
  footer,
}) => {
  const classes = useStyles({ open })
  return (
    <div className={classes.modal} onClick={() => onClose()}>
      <div className={classes.modalContent} onClick={e => e.stopPropagation()}>
        <div className={classes.modalHeader}>
          <FontAwesomeIcon
            icon={Close}
            className={classes.closeBtn}
            onClick={() => onClose()}
          />
          <span className={classes.headerText}>{header}</span>
        </div>
        <div className={classes.modalBody}>{children}</div>
        <div className={classes.modalFooter}>{footer}</div>
      </div>
    </div>
  )
}

export default Modal
