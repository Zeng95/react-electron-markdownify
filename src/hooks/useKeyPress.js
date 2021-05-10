import { useState, useEffect } from 'react'

function useKeyPress(targetKeyCode) {
  const [keyPressed, setKeyPressed] = useState(false)

  function handleKeyDown(event) {
    const { keyCode } = event

    if (keyCode === targetKeyCode) {
      setKeyPressed(true)
    }
  }

  function handleKeyUp(event) {
    const { keyCode } = event

    if (keyCode === targetKeyCode) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    const cleanup = () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return cleanup
  })

  return keyPressed
}

export default useKeyPress