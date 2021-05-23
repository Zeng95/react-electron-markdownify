import PropTypes from 'prop-types'
import useKeyPress from '@hooks/useKeyPress'
import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'

const FileTitle = styled.div`
  cursor: pointer;
`

function FileItem({ file, onFileSave, onFileClick, onFileDelete }) {
  const [editVisible, setEditVisible] = useState(false)
  const [editValue, setEditValue] = useState('')
  const inputElem = useRef(null)
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  function showEdit() {
    setEditValue(file.title)
    setEditVisible(true)
  }

  function hideEdit() {
    setEditValue('')
    setEditVisible(false)
  }

  function handleEditChange(event) {
    setEditValue(event.target.value)
  }

  useEffect(() => {
    if (editVisible) {
      inputElem.current.focus()
    }

    if (enterPressed && editVisible) {
      hideEdit()
      onFileSave(editValue)
    }

    if (escPressed && editVisible) {
      hideEdit()
    }
  })

  return (
    <li className="file-item list-group-item">
      {!editVisible && (
        <div className="row d-flex align-items-center">
          {/* File Icon */}
          <span className="col-2">
            <FontAwesomeIcon title="Markdown" icon={faMarkdown} size="lg" />
          </span>

          {/* File Title */}
          <FileTitle
            className="col-4 col-xl-6 title"
            onClick={() => onFileClick(file.id)}
          >
            {file.title}
          </FileTitle>

          {/* Edit Button */}
          <button
            type="button"
            className="col-3 col-xl-2 btn btn-primary"
            onClick={showEdit}
          >
            <span className="me-2">编辑</span>
            <FontAwesomeIcon title="编辑" icon={faEdit} size="lg" />
          </button>

          {/* Delete Button */}
          <button
            type="button"
            className="col-3 col-xl-2 btn btn-danger"
            onClick={() => onFileDelete(file.id)}
          >
            <span className="me-2">删除</span>
            <FontAwesomeIcon title="删除" icon={faTrash} size="lg" />
          </button>
        </div>
      )}

      {editVisible && (
        <div className="d-flex justify-content-between align-items-center">
          {/* Edit Input */}
          <input
            type="text"
            className="form-control mr-4"
            ref={inputElem}
            value={editValue}
            onChange={handleEditChange}
          />

          {/* Close Button */}
          <button type="button" onClick={hideEdit}>
            <FontAwesomeIcon title="关闭" icon={faTimes} size="lg" />
          </button>
        </div>
      )}
    </li>
  )
}

FileItem.propTypes = {
  file: PropTypes.object.isRequired,
  onFileSave: PropTypes.func,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func
}

export default FileItem
