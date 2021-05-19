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
  className: "text-center"
})`
  font-size: 30px;
  height: 300px;
  line-height: 300px;
  color: #ccc;
`

function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileId, setActiveFileId] = useState('')
  const [openFileIds, setOpenFileIds] = useState([])
  const [unsavedFileIds, setUnsavedFileIds] = useState([])

  const openFiles = openFileIds.map((openFileId) => {
    return files.find((file) => file.Id === openFileId)
  })

  const activeFile = openFileIds.find((file) => {
    return file.Id === activeFileId
  })

  const openClickedFile = (value) => {
    consola.info('Clicked File:', value)
  }

  const fileSave = (value) => {
    consola.info('Save File:', value)
  }

  const fileSearch = (value) => {
    const newFiles = files.filter((file) => file.title.includes(value))
    setFiles(newFiles)
  }

  const fileDelete = (value) => {
    consola.info('Delete File:', value)
  }

  const fileCreate = (value) => {
    consola.info('Create File:', value)
  }

  const clickTab = (event, Id) => {
    consola.info('Test Leo - Show Tab Id:', Id)
    event.preventDefault()
    setActiveFileId(Id)
  }

  const closeTab = (event, Id) => {
    consola.info('Test Leo - Close Tab Id:', Id)
    event.stopPropagation()
    event.preventDefault()
  }

  return (
    <div className="App container-fluId px-0">
      <div className="row g-0">
        {/* Files Panel */}
        <div className="col-4 min-vh-100 position-relative bg-light">
          <FileSearch onFileSearch={fileSearch} />

          <FileList
            files={files}
            onFileSave={fileSave}
            onFileClick={openClickedFile}
            onFileDelete={fileDelete}
          />

          {/* Actions */}
          <div className="row g-0 button-group position-absolute w-100">
            {/* Create Button */}
            <div className="col-6">
              <BottomButton
                icon={faPlusSquare}
                text="新建"
                colorClass="primary"
                handleBtnClick={fileCreate}
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
          {!activeFile && (
            <StartPage>选择或者创建新的 Markdown 文档</StartPage>
          )}

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
