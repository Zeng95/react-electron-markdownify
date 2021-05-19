import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import classnames from 'classnames'
import './TabItem.scss'

function TabItem({ file, activeId, onTabClick, onTabClose }) {
  const navLinkClasses = classnames({
    'nav-link': true,
    active: file.id === activeId
  })

  return (
    <li className="tab-item nav-item">
      <a
        className={navLinkClasses}
        href="https://www.google.com"
        onClick={(event) => onTabClick(event, file.id)}
      >
        <span className="me-2">{file.title}</span>
        <FontAwesomeIcon
          title="关闭"
          icon={faTimes}
          className="icon-close"
          onClick={(event) => onTabClose(event, file.id)}
        />
      </a>
    </li>
  )
}

export default TabItem
