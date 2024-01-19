import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';
import Home from './pages/Home';
import LoginSignup from './pages/Login';
import Cars from './pages/Cars';
import Info from './pages/Info';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {window.location.pathname != '/Login' && (
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={openSidebar} />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header OpenSidebar={openSidebar} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <Routes>
              <Route path="/Login" element={<LoginSignup />} />
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/infos" element={<Info />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
