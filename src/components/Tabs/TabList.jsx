import PropTypes from 'prop-types'
import TabItem from './TabItem'

function TabList({ files, activeId, unsavedIds, onTabClick, onTabClose }) {
  return (
    <ul className="tab-list nav nav-pills">
      {files.map((file) => {
        return (
          <TabItem
            key={file.id}
            file={file}
            activeId={activeId}
            onTabClick={onTabClick}
            onTabClose={onTabClose}
          />
        )
      })}
    </ul>
  )
}

TabList.propTypes = {
  files: PropTypes.array,
  activeId: PropTypes.string,
  unsavedIds: PropTypes.array,
  onTabClick: PropTypes.func,
  onTabClose: PropTypes.func
}

PropTypes.defaultProps = {
  unsavedIds: []
}

export default TabList
