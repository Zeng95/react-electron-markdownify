import { useState } from 'react'
import { faPlusSquare, faFileImport } from '@fortawesome/free-solid-svg-icons'
import consola from 'consola'
import defaultFiles from '@utils/defaultFiles'
import FileSearch from '@components/Files/FileSearch'
import FileList from '@components/Files/FileList'
import TabList from '@components/Tabs/TabList'
import Editor from '@components/Layout/Editor'
import BottomButton from '@components/Layout/BottomButton'
import styled from 'styled-components'
import './App.scss'

const StartPage = styled.div.attrs({
  className: 'text-center'
})`
  font-size: 30px;
  height: 300px;
  line-height: 300px;
  color: #ccc;
`

function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [unsavedFileIds, setUnsavedFileIds] = useState([])
  const [activeFileId, setActiveFileId] = useState('')
  const [openFileIds, setOpenFileIds] = useState([])

  const openFiles = openFileIds.map(id => {
    return files.find(file => file.id === id)
  })

  const activeFile = files.find(file => {
    // If it returns true, the search is stopped, the item is returned. If nothing found, undefined is returned.
    return file.id === activeFileId
  })

  // Open clicked files
  const openFile = fileId => {
    if (openFileIds.includes(fileId)) {
      return false
    }

    setActiveFileId(fileId)
    setOpenFileIds([...openFileIds, fileId])
  }

  const saveFile = value => {
    consola.info('Save File:', value)
  }

  const searchFile = value => {
    const newFiles = files.filter(file => file.title.includes(value))
    setFiles(newFiles)
  }

  const deleteFile = value => {
    consola.info('Delete File:', value)
  }

  const createFile = value => {
    consola.info('Create File:', value)
  }

  const clickTab = (event, id) => {
    event.preventDefault()
    setActiveFileId(id)
  }

  const closeTab = (event, id) => {
    event.stopPropagation()
    event.preventDefault()

    const tabsWithout = openFileIds.filter(fileId => fileId !== id)
    const currentIndex = openFileIds.findIndex(fileId => fileId === id)
    const prevFileId = openFileIds[currentIndex - 1]
    const nextFileId = openFileIds[currentIndex + 1]

    setOpenFileIds(tabsWithout)

    if (tabsWithout.length > 0) {
      currentIndex === 0 ? setActiveFileId(nextFileId) : setActiveFileId(prevFileId)
    }
  }

  return (
    <div className="App container-fluId px-0">
      <div className="row g-0">
        {/* Files Panel */}
        <div className="col-4 min-vh-100 position-relative bg-light">
          <FileSearch onFileSearch={searchFile} />

          <FileList
            files={files}
            onFileSave={saveFile}
            onFileClick={openFile}
            onFileDelete={deleteFile}
          />

          <div className="row g-0 button-group position-absolute w-100">
            {/* Create Button */}
            <div className="col-6">
              <BottomButton
                icon={faPlusSquare}
                text="新建"
                colorClass="primary"
                handleBtnClick={createFile}
              />
            </div>

            {/* Import Button */}
            <div className="col-6">
              <BottomButton
                icon={faFileImport}
                text="导入"
                colorClass="success"
              />
            </div>
          </div>
        </div>

        {/* Editor Panel */}
        <div className="col-8">
          {!activeFile && <StartPage>选择或者创建新的 Markdown 文档</StartPage>}

          {activeFile && (
            <>
              <TabList
                files={openFiles}
                activeId={activeFileId}
                unsavedIds={unsavedFileIds}
                onTabClick={clickTab}
                onTabClose={closeTab}
              />
              <Editor activeFile={activeFile} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
