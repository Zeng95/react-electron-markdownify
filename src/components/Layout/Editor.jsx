import { useState } from 'react'
import SimpleMdeReact from 'react-simplemde-editor'

function Editor(activeFile) {
  const [value, setValue] = useState(activeFile && activeFile.body)

  const onChange = (value) => {
    console.info(value)
    setValue(value)
  }

  return <SimpleMdeReact value={value} onChange={onChange} />
}

export default Editor
