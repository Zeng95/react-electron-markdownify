import React from 'react'
import PropTypes from 'prop-types'

function FileItem({ file }) {
  return (
    <li className="list-group-item">
      <span>{file.title}</span>
    </li>
  )
}

FileItem.propTypes = {
  file: PropTypes.object.isRequired
}

export default FileItem

