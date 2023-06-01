import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './components/GlobalVariable';

import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Section from './components/Section';
import Admin from './components/Admin';
import AboutUs from './components/AboutUs';
import Alert from './components/Alert';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg:message,
      type:type
    });
    setTimeout(() => {
      setAlert(null);
    },4000);
  }
  
  return (
    <>
      <Navbar showAlert={showAlert}/>
      <Alert alert={alert} />
      <Routes>
        <Route path="/" element={<Home showAlert={showAlert} />} />
        <Route path="/Section" element={<Section showAlert={showAlert}/>} />
        <Route path="/Login" element={<Login showAlert={showAlert}/>} />
        <Route path="/Admin" element={<Admin showAlert={showAlert}/>} />
        <Route path="/AboutUs" element={<AboutUs showAlert={showAlert}/>} />
      </Routes>
    </>
  )
}

export default App;