import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

function FileSearch({ title, onFileSearch }) {
  const [searchValue, setSearchValue] = useState('')
  const [searchVisible, setSearchVisible] = useState(false)
  const inputElem = useRef(null)

  function showSearch() {
    setSearchVisible(true)
  }

  function hideSearch() {
    setSearchVisible(false)
  }

  function handleSearchChange(event) {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    const handleSearchKeyUp = (event) => {
      const { keyCode } = event

      if (keyCode === 13 && searchVisible) {
        onFileSearch(searchValue)
      } else if (keyCode === 27 && searchVisible) {
        hideSearch()
        setSearchValue('')
      }
    }

    const cleanup = () => {
      document.removeEventListener('keyup', handleSearchKeyUp)
    }

    if (searchVisible) {
      inputElem.current.focus()
    }

    document.addEventListener('keyup', handleSearchKeyUp)

    return cleanup
  })

  return (
    <div className="file-search alert alert-primary">
      {!searchVisible && (
        <div className="d-flex justify-content-between align-items-center">
          <span>{title}</span>

          {/* Search Button */}
          <button
            type="button"
            className="btn btn-primary btn-search"
            onClick={showSearch}
          >
            搜索
          </button>
        </div>
      )}

      {searchVisible && (
        <div className="row">
          {/* Search Input */}
          <div className="col-9">
            <input
              type="search"
              className="form-control"
              ref={inputElem}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>

          {/* Close Button */}
          <div className="col-3 d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="btn btn-primary btn-close"
              onClick={hideSearch}
            ></button>
          </div>
        </div>
      )}
    </div>
  )
}

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired
};

FileSearch.defaultProps = {
  title: '我的云文档'
}

export default FileSearch
