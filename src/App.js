import React,{useState} from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import './App.css';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import About from './Components/About';
import LoadingBar from "react-top-loading-bar";

function App() {
  const [mode,setMode] = useState("light");
  const [pagination,setPagination] = useState(true)
  const [progress,setprogress] = useState(0)

  let toggleMode = () => {
    if(mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#181818";
      document.body.id = "style-8";
    }
    else{
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.id = "style-7";
    }
  }
   
  let togglePagination = () => {
    if(!pagination) {
      setPagination(true);
    }
    else{
      setPagination(false);
    }
  }
  let setProgress = (progress) => {
    setprogress(progress);
  }

  return (
    <Router>
      <Navbar toggleMode={toggleMode} togglePagination={togglePagination} mode={mode}/>
      <LoadingBar
        color="#ff0033"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route path='/about' element={<About mode={mode}/>}></Route>
        
        <Route path='/' element={<News setProgress={setProgress} pagination={pagination} mode={mode} category="general" key="general"/>} /> 
        <Route path='/business' element={<News setProgress={setProgress} pagination={pagination} mode={mode} category="business" key="business"/>} /> 
        <Route path='/entertainment' element={<News setProgress={setProgress} pagination={pagination} mode={mode} category="entertainment" key="entertainment"/>} /> 
        <Route path='/general' element={<News setProgress={setProgress} pagination={pagination} mode={mode} category="general" key="general"/>} /> 
        <Route path='/health' element={<News setProgress={setProgress} pagination={pagination} mode={mode} category="health" key="health"/>} /> 
        <Route path='/science' element={<News setProgress={setProgress} pagination={pagination} mode={mode} category="science" key="science"/>}  /> 
        <Route path='/sports' element={<News setProgress={setProgress} pagination={pagination} mode={mode} category="sports" key="sports"/>} /> 
        <Route path='/technology' element={<News setProgress={setProgress} pagination={pagination} mode={mode} category="technology" key="technology"/>}  />
      </Routes>
      
    </Router>
  );
}

export default App;
