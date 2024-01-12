import { useState } from 'react';
import './App.css';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './pages/Login';
import Cars from './pages/Cars';
import Info from './pages/Info';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <Routes>
      <Route path='/Login' element= {<LoginSignup/>}/>
        <Route
          path="/"
          element={
            <div className='grid-container'>
              <Header OpenSidebar={OpenSidebar}/>
              <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
              <Home />
            </div>
          }
        />
        <Route
          path="/cars"
          element={
            <div className='grid-container'>
              <Header OpenSidebar={OpenSidebar}/>
              <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
              <Cars />
            </div>
          }
        />
        <Route
          path="/infos"
          element={
            <div className='grid-container'>
              <Header OpenSidebar={OpenSidebar}/>
              <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
              <Info />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
