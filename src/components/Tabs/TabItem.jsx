import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import styled from 'styled-components'
import './TabItem.scss'

function TabItem({ file, activeId, isUnsaved, onTabClick, onTabClose }) {
  const NavLink = styled.a.attrs({
    className: `nav-link d-flex align-items-center ${file.id === activeId ? 'active' : ''} ${isUnsaved ? 'unsaved' : ''}`
  })``

  const handleClickOnLink = event => {
    onTabClick(event, file.id)
  }

  const handleClickOnClose = event => {
    onTabClose(event, file.id)
  }

  return (
    <li className="tab-item nav-item">
      <NavLink href="https://www.google.com" onClick={handleClickOnLink}>
        <span className="me-2">{file.title}</span>
        <FontAwesomeIcon
          title="关闭"
          icon={faTimes}
          className="icon-close"
          onClick={handleClickOnClose}
        />
        {isUnsaved && (
          <FontAwesomeIcon
            title="未保存"
            icon={faCircle}
            className="icon-unsaved"
          />
        )}
      </NavLink>
    </li>
  )
}

export default TabItem
