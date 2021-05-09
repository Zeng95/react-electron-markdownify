import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

const StyledFileSearch = styled.div`
  height: 72px;
`

function FileSearch({ title, onFileSearch }) {
  const [searchValue, setSearchValue] = useState('')
  const [searchVisible, setSearchVisible] = useState(false)
  const inputElem = useRef(null)

  function showSearch() {
    setSearchVisible(true)
  }

  function hideSearch() {
    setSearchValue('')
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
    <StyledFileSearch className="alert alert-primary d-flex justify-content-between align-items-center">
      {!searchVisible && (
        <>
          {/* Title */}
          <span>{title}</span>

          {/* Search Button */}
          <button type="button" onClick={showSearch}>
            <FontAwesomeIcon title="搜索" icon={faSearch} size="lg" />
          </button>
        </>
      )}

      {searchVisible && (
        <>
          {/* Search Input */}
          <input
            type="search"
            className="form-control mr-4"
            ref={inputElem}
            value={searchValue}
            onChange={handleSearchChange}
          />

          {/* Close Button */}
          <button type="button" onClick={hideSearch}>
            <FontAwesomeIcon title="关闭" icon={faTimes} size="lg" />
          </button>
        </>
      )}
    </StyledFileSearch>
  )
}

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired
}

FileSearch.defaultProps = {
  title: '我的云文档'
}

export default FileSearch
