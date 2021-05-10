import consola from 'consola'
import defaultFiles from '@utils/defaultFiles'
import FileSearch from '@components/Files/FileSearch'
import FileList from '@components/Files/FileList'
import BottomButton from '@components/Layout/BottomButton'
import { faPlusSquare, faFileImport } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  function handleFileSearch(value) {
    consola.info('Search Value:', value)
  }

  return (
    <div className="App container-fluid px-0">
      <div className="row g-0">
        {/* Left Panel */}
        <div className="col">
          <FileSearch onFileSearch={handleFileSearch} />
          <FileList files={defaultFiles} />

          {/* Actions */}
          <div className="row g-0">
            <div className="col-6">
              <BottomButton icon={faPlusSquare} text="新建" colorClass="primary" />
            </div>
            <div className="col-6">
              <BottomButton icon={faFileImport} text="导入" colorClass="success" />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col bg-primary">Column Right</div>
      </div>
    </div>
  )
}

export default App
