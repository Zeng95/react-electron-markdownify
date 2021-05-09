import React from 'react'
import PropTypes from 'prop-types'
import FileItem from './FileItem'

function FileList({ files }) {
  return (
    <div className="file-list">
      <ul className="list-group">
        {files.map((file) => {
          return <FileItem file={file} key={file.id} />
        })}
      </ul>
    </div>
  )
}

FileList.propTypes = {
  files: PropTypes.array
}

FileList.defaultProps = {
  files: []
}

export default FileList
