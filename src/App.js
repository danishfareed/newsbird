import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Newscomponent from './components/Newscomponent';
import LoadingBar from 'react-top-loading-bar'

import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const pageSize = 4;
  const apiKey = process.env.REACT_APP_NEWSBIRD_API_KEY;
  const country = "gb";

  const [progress, setProgress] = useState(0);
  
    return (
      <>
      <BrowserRouter>
        <LoadingBar 
        color='#c026d3' 
        progress={progress}
      />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Newscomponent setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={country} category="general"/>} />
          <Route exact path="/science" element={<Newscomponent setProgress={setProgress} apiKey={apiKey} key="genscienceral" pageSize={pageSize} country={country} category="science"/>} />
          <Route exact path="/technology" element={<Newscomponent setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country={country} category="technology"/>} />
          <Route exact path="/sports" element={<Newscomponent setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country={country} category="sports"/>} />
          <Route exact path="/health" element={<Newscomponent setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country={country} category="health"/>} />
          <Route exact path="/business" element={<Newscomponent setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country={country} category="business"/>} />
          <Route exact path="/entertainment" element={<Newscomponent setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country={country} category="entertainment"/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </>
    )
}
export default App;

