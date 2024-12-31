import React,{useState} from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import './App.css';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'

function App() {
  const [mode,setMode] = useState("light");
  const [pagination,setPagination] = useState(true)

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

  return (
    <Router>
      <Navbar toggleMode={toggleMode} togglePagination={togglePagination} mode={mode}/>
      <Routes>
        <Route path='/' element={<News pagination={pagination} mode={mode} category="general" key="general"/>} /> 
        <Route path='/business' element={<News pagination={pagination} mode={mode} category="business" key="business"/>} /> 
        <Route path='/entertainment' element={<News pagination={pagination} mode={mode} category="entertainment" key="entertainment"/>} /> 
        <Route path='/general' element={<News pagination={pagination} mode={mode} category="general" key="general"/>} /> 
        <Route path='/health' element={<News pagination={pagination} mode={mode} category="health" key="health"/>} /> 
        <Route path='/science' element={<News pagination={pagination} mode={mode} category="science" key="science"/>}  /> 
        <Route path='/sports' element={<News pagination={pagination} mode={mode} category="sports" key="sports"/>} /> 
        <Route path='/technology' element={<News pagination={pagination} mode={mode} category="technology" key="technology"/>}  />
      </Routes>
      
    </Router>
  );
}

export default App;
