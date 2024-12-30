import Navbar from './Components/Navbar';
import News from './Components/News';
import './App.css';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<News category="general" key="general"/>} /> 
        <Route path='/business' element={<News category="business" key="business"/>} /> 
        <Route path='/entertainment' element={<News category="entertainment" key="entertainment"/>} /> 
        <Route path='/general' element={<News category="general" key="general"/>} /> 
        <Route path='/health' element={<News category="health" key="health"/>} /> 
        <Route path='/science' element={<News category="science" key="science"/>}  /> 
        <Route path='/sports' element={<News category="sports" key="sports"/>} /> 
        <Route path='/technology' element={<News category="technology" key="technology"/>}  />
      </Routes>
      
    </Router>
  );
}

export default App;
