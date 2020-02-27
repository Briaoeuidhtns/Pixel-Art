import React from 'react'

interface Props {
  onDrop: (files: FileList) => void
}
export const DragAndDrop: React.FC<Props> = ({ onDrop, children }) => (
  <div
    onDragEnter={e => {
      e.preventDefault()
      e.stopPropagation()
    }}
    onDragLeave={e => {
      e.preventDefault()
      e.stopPropagation()
    }}
    onDragOver={e => {
      e.preventDefault()
      e.stopPropagation()
    }}
    onDrop={e => {
      e.preventDefault()
      e.stopPropagation()
      e.persist()
      if (e.dataTransfer.files.length > 0) {
        onDrop(e.dataTransfer.files)
      }
    }}
  >
    {children}
  </div>
)
