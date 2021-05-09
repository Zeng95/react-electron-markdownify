import PropTypes from 'prop-types'
import FileItem from './FileItem'

function FileList({ files }) {
  return (
    <ul className="list-group list-group-flush">
      {files.map((file) => {
        return <FileItem file={file} key={file.id} />
      })}
    </ul>
  )
}

FileList.propTypes = {
  files: PropTypes.array
}

FileList.defaultProps = {
  files: []
}

export default FileList
