import { useState } from 'react';
import './App.css';
import Infobox from './components/Infobox/Infobox';
// import BlogList from './components/BlogList/BlogList'
import SelectedWorks from './components/SelectedWorks/SelectedWorks';

function App() {
  const [title, setTitle] = useState({ top: "Tobias", bottom: "Krogshede" });
  return (
    <>
      <div className="min-vh-100 d-flex flex-column align-items-start justify-content-end p-5">
          <Infobox topText={title.top} bottomText={title.bottom} />
          
          <div className="mt-5">
            <SelectedWorks setTitle={setTitle} />
          </div>
      </div>
    </>
  )
}

export default App
