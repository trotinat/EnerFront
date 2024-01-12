import React from 'react'
import 
{BsGrid1X2Fill, BsFuelPump}
 from 'react-icons/bs'
 import { FaCar } from "react-icons/fa";
 import { IoLogOut } from "react-icons/io5";
 import { IoIosInformationCircle } from "react-icons/io";
 import AuthService from '../Auth/AuthService'; 

 
 const handlelogout = async () => {
    const isAuthenticated = await AuthService.logout();
   
      window.location.replace(window.location.origin + '/login');

  };


function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='nadi'>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsFuelPump  className='icon_header'/> ENERDRIVE
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>x</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/cars">
                    <FaCar className='icon'/> Cars
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/infos">
                    <IoIosInformationCircle className='icon'/> Information
                </a>
            </li>
        </ul>
        <div className='logout'>
        <a  onClick={handlelogout}>
        <IoLogOut className='icon' /> Logout
        </a>
        </div>
        <footer className='copyright'>
            <h6 className='cp'>COPYRIGHT ALL RIGHT RESERVED @2023</h6>
        </footer>
        </div>
    </aside>
  )
}

export default Sidebar