import logo from './logo.svg';
import './App.css';
//import Input from './components/input';
import Box from './components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import History from './components/qrcomponent';

function App() {
  return ( 
  <>
  


  <BrowserRouter>
      <Routes>
        <Route>
        <Route path="/" element={<Box />}/>
        <Route path="/history" element={<History />}/>

        </Route>
      </Routes>
    </BrowserRouter>
  
  </> );
}

export default App;
