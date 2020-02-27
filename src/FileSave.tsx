import React, { useState, useRef } from 'react'

export const FileSave: React.FC = () => {
  const [fileName, setFileName] = useState([])
  const fileInput = useRef<HTMLInputElement>(null!)

  return (
    <>
      <input type="file" ref={fileInput} />
    </>
  )
}
