import PropTypes from 'prop-types'
import FileItem from './FileItem'

function FileList({ files, onFileSave, onFileClick, onFileDelete }) {
  return (
    <ul className="file-list list-group list-group-flush">
      {files.map((file) => {
        return (
          <FileItem
            file={file}
            key={file.id}
            onFileSave={onFileSave}
            onFileClick={onFileClick}
            onFileDelete={onFileDelete}
          />
        )
      })}
    </ul>
  )
}

FileList.propTypes = {
  files: PropTypes.array,
  onFileSave: PropTypes.func,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func
}

FileList.defaultProps = {
  files: []
}

export default FileList
