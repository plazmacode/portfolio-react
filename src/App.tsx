import './App.css';
import Infobox from './components/Infobox/Infobox';
// import BlogList from './components/BlogList/BlogList'
import SelectedWorks from './components/SelectedWorks/SelectedWorks';

function App() {
  return (
    <>
      <div className="min-vh-100 d-flex flex-column align-items-start justify-content-end p-5">
          <Infobox></Infobox>
          <div className="mt-5">
            <SelectedWorks></SelectedWorks>
          </div>
      </div>
    </>
  )
}

export default App
