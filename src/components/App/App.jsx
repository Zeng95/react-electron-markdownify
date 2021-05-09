import consola from 'consola'
import FileSearch from '@components/Files/FileSearch'
import FileList from '@components/Files/FileList';
import defaultFiles from '@utils/defaultFiles';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col left-panel px-0">
          <FileSearch
            title="My Document"
            onFileSearch={(value) => {
              consola.info('Search Value:', value)
            }}
          />
          <FileList files={defaultFiles} />
        </div>
        <div className="col bg-primary right-panel">Column Right</div>
      </div>
    </div>
  )
}

export default App
